用Python控制其他行程的TTY終端裝置
#################################

:date: 2018-04-11
:category: Python
:tags: Python, TTY, Linux

Foreword
********

這篇文章會稍微解釋Unix的TTY系統以及Pseudo Terminal的概念，
接著討論如何使用Python的 ``pty`` 模組中的 ``pty.fork()``
來建立並控制子行程的TTY系統，
最後用Python來實作控制 *madplay* 這個CLI MP3 Player。

有問題歡迎大家詢問，有任何錯誤也請大家幫忙指正 :D

----

Python MP3 Player
*****************

這幾天在玩 ReSpeaker_ （一個基於MT7688的聲控裝置開發板）遇到了個問題：
在ReSpeaker中要如何使用Python播放MP3檔案？

好在ReSpeaker上已有 *madplay* 這個指令，能夠直接播放MP3：

.. code-block:: bash

   $ madplay MP3_FILE

更讚的是只要加上 ``--tty-control`` 就能直接控制播放狀態！

.. code-block:: bash

   $ madplay MP3_FILE --tty-control MP3_FILE

例如按下 ``p`` 就能控制音樂播放的暫停/繼續。
很好！這樣就可以用 ``subprocess`` 模組啟動madplay來控制音樂播放啦！
然後\ **對這個子行程的stdin** 寫入這些控制用的鍵應該就能控制音樂播放了吧？
至少我是這樣想的…

The mystery TTY
***************

俗話說的好，代誌往往不是憨人所想的那麼簡單，試了幾回後發現竟然沒效？！
一氣之下翻了翻madplay的原始碼，發現 ``player.c``
裡有些跟 *TTY* 這玩意兒有關的程式碼：

.. code-block:: C

   # define TTY_DEVICE "/dev/tty"
   ...
   tty_fd = open(TTY_DEVICE, O_RDONLY);
   ...
   count = read(tty_fd, &key, 1);
   ...

玩過Linux的朋友們應該對TTY這個字有強烈的熟悉感，
好像三不五時就會看到這東西出現。於是我拿他去Google後得到下面幾個結論：

1. TTY源自於 *Teletype* 這個單字，中文稱為 **電傳打字機** ，
   是古早年代用來遠距離傳遞文字資訊用的機器以及機制。

2. 很久很久以前並沒有PC — Personal Computer這種東西，
   有的只是一台螢幕加鍵盤組成的終端機，
   透過串列埠等等的傳輸方式與一台中央主機溝通，進行控制與運算的工作。
   Unix下的TTY裝置概念就是從這裡出現的，細節可參考我列在最後面的References。

3. TTY裝置架構中有一層叫做 `Line discipline`_ 。
   這東西介於軟體層（行程接收到的資訊）和驅動層（實際上與硬體打交道那一層）間，
   負責對從其中一層傳遞過來的資訊做前處理，再傳到另一層。
   舉例像是Line editing（Buffering、Backspace、Echoing、移動游標等…）、
   字元轉換（ ``\n`` 與 ``\r\n`` 互相轉換…）、
   控制字元轉換為信號（ASCII 0x03→SIGINT）等等的功能。

4. ``/dev/tty`` 裝置代表的是 **目前行程所連接著的終端（Terminal）裝置** 。

從 ``player.c`` 中的程式碼看起來，madplay是直接從/dev/tty這個裝置讀取鍵盤輸入，
而不是從stdin讀取。聽起來有點多此一舉，但這麼做有個好處：

   一個行程可以在從stdin接收資料的同時，接收來自鍵盤的訊息。

舉例來說， ``cat MP3_FILE | madplay -—tty-control -``
這串指令中的madplay會讀取stdin，而 ``cat MP3_FILE`` 這個指令會將 ``MP3_FILE``
這個檔案輸出到stdout，中間我們藉由 ``|`` 來將這些資料導向至madplay進行播放。
在這一連串事情發生的同時，使用者同樣可以用鍵盤控制播放狀態。

既然如此，那有沒有辦法控制一個行程所連接著的終端裝置呢？更重要的是，
Python做的到嗎？

Pseudo Terminal
***************

當然可以！針對控制一個行程的終端，Python標準函式庫提供了
`pty`_ 這個模組來處理與 *Pseudo Terminal* 有關的概念。那什麼是Pseudo Terminal？

現在PC當道，基本上已經不存在過去那種「
使用（不具運算能力的）終端連上一台電腦進行控制與運算」的情境。
但是我們想把TTY這個概念延續到現在繼續用該怎麼辦？
於是就出現了Pseudo Terminal（注意：跟Virtual Terminal是不同的概念）。

關於他的定義，我們直接來看一下
`pty的Linux man page <https://linux.die.net/man/7/pty>`_ ：

   A pseudoterminal (sometimes abbreviated “pty”) is a pair of virtual
   character devices that provide a bidirectional communication channel.
   One end of the channel is called the master; the other end is called the
   slave. The slave end of the pseudoterminal provides an interface that
   behaves exactly like a classical terminal. A process that expects to be
   connected to a terminal, can open the slave end of a pseudoterminal and
   then be driven by a program that has opened the master end. Anything that is
   written on the master end is provided to the process on the slave end as
   though it was input typed on a terminal.

Pseudo Terminal建立了兩個虛擬字元裝置，分別稱為master與slave，
提供了一個雙向溝通的管道。
讀寫slave端的的行程可以把該slave裝置完全當作是一個普通的TTY裝置軟體層，
具有終端的行為模式。而另一個行程則能對master端進行讀寫，
把master端當作是TTY裝置的硬體層。 **而其中對master或slave端寫入的資訊，
同樣會經過line discipline的處理，再進到另一端。**

借 `The TTY demystified`_ 這篇文章中的圖來說明：

.. image:: {static}images/how-xterm-works.png

換句話說，就是 **串列埠接頭變成了一個file descriptor** 。於是呢，
像xterm之類的終端模擬器（Terminal Emulator）
就能夠以程式的方式去模擬一台古早年代終端機，
將使用者使用終端機對串列埠寫入及讀取的行為模式，
改為 **寫入及讀取這個file descriptor** ，在同一台機器上模擬終端的輸入及輸出。

大概了解了Pseudo Terminal，接下來看看Python怎麼做這件事。

The pty module
**************

一句話解釋完pty模組：

   starting another process and being able to write to and read from its
   controlling terminal programmatically.

Bingo，這聽起來就是我想要的啊！其中我們會需要用到 ``pty.fork`` 這個函式：

   ``pty.fork()`` ：Fork一個子行程，
   並讓該子行程的控制終端接上一個Pseudo Terminal的slave端。
   父行程會得到該Pseudo Terminal的master端，以一個file descriptor表示。
   這個函式的回傳值是個tuple：(pid, fd)，子行程得到的pid會是0，
   而父行程會得到一個非0的值，為子行程的pid。

換句話說，我們可以啟動一個子行程，並使用父行程來控制該子行程的終端裝置，
也就是/dev/tty。在實做之前，先來測試一下 ``pty.fork()`` ：

.. code-block:: python
   :linenos: table

   import pty
   import time
   import os
   import sys


   pid, fd = pty.fork()
   if pid == 0:
       # Child process
       while True:
           try:
               sys.stdout.write('Hello World!\n')
               time.sleep(100)
           except KeyboardInterrupt:
               sys.stdout.write('SIGINT Received!\n')
               sys.exit(1)
   else:
       print('Parent wait for 1 sec then write 0x03...')
       time.sleep(1)
       print('Parent write 0x03')
       os.write(fd, b'\x03')
       # Read until EOF or Input/Output Error
       data = b''
       while True:
           try:
               buf = os.read(fd, 1024)
           except OSError:
               break
           else:
               if buf != b'':
                   data += buf
               else:
                   break
       print('Parent read from pty fd: {}'.format(repr(data)))
       print('Parent wait for child process {!r} to exit...'.format(pid))
       pid, status = os.waitpid(pid, 0)
       print('Parent exit')

執行以上程式碼後應該會出現以下結果(Ubuntu 16.04 with Python 3.5)：

.. code-block:: bash

   $ python3.5 pty_fork_test.py
   Parent wait for 1 sec then write 0x03...
   Parent write 0x03
   Parent read from pty fd: b'Hello World!\r\n^CSIGINT Received!\r\n'
   Parent wait for child process 17676 to exit...
   Parent exit

這段程式碼展示了父行程如何使用 ``pty.fork()``
回傳的file descriptor與子行程溝通的過程：

1. 子行程的stdout連接到slave端，
   因此子行程對stdout寫入的內容可以被父行程透過讀取master端，
   也就是 ``pty.fork()`` 回傳的file descriptor，來接收。
   因此，父行程能夠讀取到子行程對stdout寫入的 ``Hello World!\n`` 字串。

2. 子行程寫入的 ``Hello World\n`` 到了父行程變成了 ``Hello World\r\n`` ，
   多了一個 *Carriage Return* ``\r`` 字元，
   這是Line discipline正在作用的結果。這證明了中間並不是只有單純的資料交換，
   而是Linux的TTY系統在作動中。

3. 父行程對file descriptor寫入數值 ``0x03`` 後，
   到了子行程變成了SIGINT信號而被Python捕捉為 ``KeyboardInterrupt`` 例外，
   接著子行程對stdout寫入 ``SIGINT Received!\n`` 字串，
   然後被父行程讀取並顯示為 ``^CSIGINT Received!\r\n`` 。
   這也證明了Line discipline以及TTY系統的作用。

以上是對 ``pty.fork()`` 做的簡單測試。接下來來實做啦！

.. _ReSpeaker: https://www.seeedstudio.com/ReSpeaker-Core-Based-On-MT7688-and-OpenWRT-p-2716.html
.. _Line discipline: https://en.wikipedia.org/wiki/Line_discipline
.. _pty: https://docs.python.org/3/library/pty.html
.. _The TTY demystified: http://www.linusakesson.net/programming/tty/

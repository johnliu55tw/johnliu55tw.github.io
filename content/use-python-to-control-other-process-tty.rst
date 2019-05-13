用Python控制其他行程的TTY終端裝置
#################################

:date: 2018-04-11
:category: Python
:tags: Python, TTY, Linux

Foreword
********

這篇文章會稍微解釋Unix的TTY系統以及Pseudo Terminal的概念，
接著討論如何使用Python的 ``pty`` 模組中的 ``pty.fork()`` 來建立並控制子行程的
TTY系統，最後用Python來實作控制 *madplay* 這個CLI MP3 Player。

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
一氣之下翻了翻madplay的原始碼，發現 ``player.c`` 裡有些跟 *TTY* 這玩意兒有關的程式碼：

.. code-block:: C

   # define TTY_DEVICE "/dev/tty"
   ...
   tty_fd = open(TTY_DEVICE, O_RDONLY);
   ...
   count = read(tty_fd, &key, 1);
   ...

玩過Linux的朋友們應該對TTY這個字有強烈的熟悉感，
好像三不五時就會看到這東西出現。於是我拿他去Google後得到下面幾個結論：

1. TTY源自於 *Teletype* 這個單字，中文稱為\ **電傳打字機**\ ，
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

.. _ReSpeaker: https://www.seeedstudio.com/ReSpeaker-Core-Based-On-MT7688-and-OpenWRT-p-2716.html
.. _Line discipline: https://en.wikipedia.org/wiki/Line_discipline

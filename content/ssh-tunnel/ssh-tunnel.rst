####################################
SSH Tunneling (Port Forwarding) 詳解
####################################

:date: 2020-05-21
:modified: 2020-05-25
:category: SSH, Linux
:tags: SSH, Linux, Tunneling, Port Forwarding
:summary: 詳細解釋使用SSH的Local Port Forwarding、Remote Port Forwarding、
          和Dynamic Port Forwarding來建立加密通道（Tunneling）的方法。

.. admonition:: 變更記錄

   2020-05-25
      加入「小技巧和工具」章節來放各種SSH Tunneling的小技巧和工具。

前陣子研究了一下用SSH Tunneling來連到內部網路的方法，
一開始實在有點難理解SSH指令與實際情況的關係，但了解後才發現他超級強大，
於是就把細節記錄下來之後可以參考，也希望能幫大家了解一下這東西。

*****************************************
什麼是SSH Tunneling (Port Forwarding)？
*****************************************

Tunneling指的是將網路上的A、B兩個端點用某種方式連接起來，形成一個「隧道」，
讓兩端的通訊能夠穿透某些限制（例如防火牆），或是能將通訊內容加密避免洩漏。
而SSH Tunneling就是指利用SSH協定來建立這個隧道，所以不但能加密你的通訊，
如果中間設有防火牆擋掉某些特定Port的連線（例如HTTP/HTTPS的80/443）
而沒有擋下SSH的Port 22，這個隧道便會讓防火牆認為是只是一般的SSH連線，進而放行，
也就達到了「穿透防火牆」的效果。

另外，因為SSH Tunneling的目標是兩個端點上的Port，
而過程就像是把對A點上的某個Port X所傳送的資料 **轉送**
（Forward）至B點上的Port Y，所以SSH Tunneling又稱為 **SSH Port Forwarding** 。

.. image:: {static}images/tunneling.png
   :alt: Tunneling示意圖

SSH Port Forwarding有下列三種模式：

- Local Port Forwarding
- Remote Port Forwarding
- Dynamic Port Forwarding

接下來會一一說明各種模式。
先來看看在SSH Port Forwarding當中參與的角色有哪些。

***************************
Port Fowarding 裡的角色定義
***************************

對Local和Remote Port Forwarding來說，都會有下面這三個角色：

Client
    - 任何你可以敲 ``ssh`` 指令來啟動Port Forwarding的機器

SSH Server
    - 可以被 **Client** 用SSH連進去的機器

Target Server
    - 某一台你想建立連線的機器，通常是為了對外開放這台機器上的服務
    - **注意** ， **Client** 與 **SSH Server** 本身都可以是 **Target Server** ，
      不是真的要有三台機器才可以進行Port Forwarding！

而Dynamic Port Forwarding比較不一樣，在於Target Server不會只有一台，
而是可以被動態決定的。

了解了這三個角色，那就先來看看Local Port Forwarding是怎麼回事。

*********************
Local Port Forwarding
*********************

指令語法
========

.. code-block:: general

   ssh -L [bind_address:]<port>:<host>:<host_port> <SSH Server>

在 **Client** 上開啟 ``bind_address:port`` 等待連線，當有人連上時，
將所有資料轉送到 ``host:host_port`` 去。
**注意** ， ``host`` 是相對於 **SSH Server** 的位址，而不是 **Client** ！

使用情境一：連到位在防火牆後的開發伺服器上的服務
================================================

你有一台位於防火牆後的開發伺服器， 你在上面架了某個服務在Port 8080上，
但防火牆只開放Port 22的SSH連線，讓你無法從你的電腦直接連到Port 8080，
但你又很想連到他…

.. image:: {static}images/local_scenario1_problem.png
   :alt: 情境1示意圖

這時候只要你能夠SSH到那台伺服器，
就可以利用Local Port Forwarding來開啟你電腦上的某個Port（假設為9090），
將對它發送的資料轉送到伺服器的Port 8080。
這樣一來， 連上你的電腦的Port 9090就等於連上了防火牆後的伺服器的Port 8080 ，
也就繞過了防火牆的限制。

.. image:: {static}images/local_scenario1_solved.png
   :alt: 情境1解法示意圖

Client
    - 你的電腦

SSH Server
    - 防火牆後的伺服器
    - SSH Destination： ``johnliu@my-server``

Target Server
    - 防火牆後的伺服器

SSH指令：

.. code-block:: general

   ssh -L 9090:localhost:8080 johnliu@my-server

這邊的 ``localhost`` 是相對於 ``johnliu@my-server`` ，
指的就是防火牆後的伺服器本身。

.. note::

    - 你完全可以在你的電腦上用相同的Port number來做Port Forwarding，
      這邊用 ``9090`` 只是為了避免混淆：

      .. code-block:: general

          ssh -L 8080:localhost:8080 johnliu@my-server

    - 如果你沒有給 ``bind_address`` ，預設會Bind在 ``localhost`` 上。
      如果你想把 Port ``9090`` 開放給所有人用：

      .. code-block:: general

          ssh -L 0.0.0.0:9090:localhost:8080 johnliu@my-server

使用情境二：透過防火牆後的機器，連到防火牆後的特定服務
======================================================

情境一有用的前提是 **你能夠SSH到提供服務的伺服器裡** ，
但今天如果你沒有權限，無法SSH進到提供服務的伺服器，那該怎麼辦呢？

.. image:: {static}images/local_scenario2_problem.png
   :alt: 情境1示意圖

沒問題！只要你在防火牆後有任何一台你可以SSH的機器，
接著修改一下指令裡的 ``host`` 設定，你就可以利用這台機器進行資料轉送：

.. image:: {static}images/local_scenario2_solved.png
   :alt: 情境1解法示意圖

Client
    - 你的電腦

SSH Server
    - 防火牆後你的機器
    - SSH Destination： ``johnliu@my-server``

Target Server
    - 防火牆後的伺服器
    - ``192.168.1.101:8080``

SSH指令：

.. code-block:: general

   ssh -L 9090:192.168.1.101:8080 johnliu@my-server

這邊的 ``192.168.1.101`` 是相對於 ``johnliu@my-server`` ，
所以是防火牆後的伺服器的IP位址。

**********************
Remote Port Forwarding
**********************

指令語法
========

.. code-block:: general

    ssh -R [bind_address:]<port>:<host>:<host_port> <SSH Server>

在 **SSH Server** 上開啟 ``bind_address:port`` 等待連線，當有人連上時，
將所有資料轉送到 ``host:host_port`` 去。
**注意** ， ``host`` 是相對於 **Client** 的位址，而不是 **SSH Server** ！

使用情境一：透過對外機器，讓其他人能夠連到你的電腦上的服務
==========================================================

你在你的電腦上開發完了一個服務架在Port 8080上，然後你想要Demo給客戶看，
但你的電腦只有內部IP，所以無法讓客戶連進來：

.. image:: {static}images/remote_scenario1_problem.png
   :alt: Remote情境1示意圖

這時候只要利用SSH Remote Forwarding，
就可以藉由一台有Internet IP的對外機器，開啟上面的某個Port（假設為9090）
來轉送資料到你的電腦上的Port 8080。
這樣子，客戶只要連上對外機器的Port 9090就等於是連上了你電腦的Port 8080。

.. image:: {static}images/remote_scenario1_solved.png
   :alt: Remote情境1解法示意圖

Client
    - 你的電腦

SSH Server
    - 對外機器
    - SSH Destination： ``johnliu@external-server``

Target Server
    - 你的電腦

SSH指令：

.. code-block:: general

    ssh -R 0.0.0.0:9090:localhost:8080 johnliu@external-server

這邊的 ``localhost`` 是相對於 **Client**  ，指的就是你的電腦本身。

.. warning::

    基於安全考量，
    **Remote Forwarding預設都只能夠bind在SSH Server的localhost上** ，
    所以單靠以上指令是無法讓Port 9090開放給外部連線的。
    你必須調整SSH Server上的SSH服務的設定檔（一般在 ``/etc/ssh/sshd_config`` ）
    加入 ``GatewayPorts`` 設定，才能讓所有人都連到：

    .. code-block:: general

        GatewayPorts yes

    這邊有三個選項：預設為 ``no`` ，也就是唯一指定localhost；
    設定為 ``yes`` 可以唯一指定為wildcard（ ``0.0.0.0`` ）；
    設定為 ``clientspecified`` 可以讓啟動Remote Forwarding的Client自行指定。

使用情境二：透過對外機器，從外面連回內部網路上的服務
====================================================

有一個在內網裡的內部服務，你的電腦可以用IP ``192.168.1.100``
和Port 8080連到這個服務，但因為都在內網所以大家都沒有Internet IP，
所以無法讓你從家裡透過Internet連回來：

.. image:: {static}images/remote_scenario2_problem.png
   :alt: Remote情境2示意圖

這時候藉由Remote Forwarding和一台對外機器， 可以讓你從任何地方連回這個服務：

.. image:: {static}images/remote_scenario2_solved.png
   :alt: Remote情境2解法示意圖

Client
    - 你的電腦

SSH Server
    - 對外機器
    - SSH Destination： ``johnliu@external-server``

Target Server
    - 內部服務
    - ``192.168.1.100:8080``

SSH指令：

.. code-block:: general

    ssh -R 0.0.0.0:9090:192.168.1.100:8080 johnliu@external-server

在這裡， ``192.168.1.100`` 是相對於你的電腦，所以就算外部機器連不到這個位址
也沒關係，因為是透過你的電腦做資料轉送。
這樣子，只要連到對外機器上的Port 9090就等於是連到內部服務上的Port 8080了，
你就能夠從外部存取內網服務。

這應該是SSH Port Forwarding最強大的功能了！只要在網路上租一台最便宜的主機
（Linode, Digital Ocean之類的），就可以拿他來當圖示中的對外機器，
來連回內部網路上的服務。
不過前提是你得在有內網連線時將Port Forwarding設定好，
如果你到家後才想到，那就請你再跑一趟吧…

***********************
Dynamic Port Forwarding
***********************

指令語法
========

.. code-block:: general

    ssh -D [bind_address:]<port> <SSH Server>

在SSH Server上啟動一個 SOCKS_ 代理伺服器，
同時在 **Client** 上開啟 ``bind_address:port`` 等待連線，當有人連上時，
將所有資料轉送到這個SOCKS代理伺服器上，啟動相對應的連線請求。

使用情境：建立一個HTTP代理伺服器連到內網的所有HTTP(S)服務
=========================================================

只要有一台位於內網且 **具有外部IP** 的機器，
你就可以利用這個方法建立一個HTTP代理伺服器，
讓你能夠從外面連回內網裡的所有HTTP(S)服務：

.. image:: {static}images/dynamic.png
   :alt: Dynamic情境示意圖

Client
    - 你的電腦

SSH Server
    - 內網裡具有外部IP的機器

Target Server
    - N/A

SSH指令：

.. code-block:: general

    ssh -D 9090 johnliu@internal-machine

假設你是用Linux和Chrome，
你可以在你的電腦上用以下指令讓Chrome使用這個代理伺服器：

.. code-block:: general

    google-chrome --user-data-dir=~/proxied-chrome --proxy-server=socks5://localhost:9090

.. note::

    - 這邊的 ``google-chrome`` 只是範例，不同的Linux發行版名字可能會不同
    - ``--user-data-dir`` 是為了讓Chrome能夠開啟一個新的Chrome session，
      不加的話 ``--proxy-server`` 這個設定就沒用了

一般的Port Forwarding只能夠轉送 **一個IP上的一個Port** ，
當你有很多IP或很多Port想轉時就只能一個一個開， 很不方便。
相比之下，Dynamic Port Forwarding能直接架起一個代理伺服器，
只要你用的程式有支援SOCKS協定，透過這個代理伺服器讓你想怎麼轉就怎麼轉。
不過這方式也不是沒缺點，就是那台轉送用的機器一定得要有對外IP，
這樣才能夠從你的電腦連回來。

****
結論
****

從圖可以看出來，Local跟Remote Forwarding的差異主要在 **Port開啟的地方** ：
Local Forwarding是將Client上的Port打開以供連線；
Remote Forwarding則是將SSH Server上的Port打開。
另外要注意的點是轉送的目的地 ``host`` ：Local Forwarding是相對於SSH Server，
而Remote Forwarding則是相對於Client。

雖然Dynamic Port Forwarding的彈性更大，
但條件就是SSH Server就必須要能夠從外面連回來。
不過其實也是有Workaround啦，搭配一下Port Forwarding就行了，
但這樣的話你有更好的Proxy選擇，像是 `Tinyproxy`_ 等等。

就寫到這邊，有問題也歡迎大家討論唷！

******************
補充：小技巧和工具
******************

這邊放一些大家在使用SSH Tunneling上的小技巧和工具，但細節就請大家自行Google囉。

常用的SSH指令參數
=================

``-N``
    不要執行任何遠端指令。沒有加這個參數時，建立Port Forwarding的同時也會開啟
    Remote Shell，讓你可以對SSH Server下指令，而這個參數可以讓Remote Shell
    不要打開。

``-f``
    讓 ``ssh`` 指令在背景執行，讓你可以繼續用Shell做事情。通常會搭上面的
    ``-N`` 使用。

常用的SSH Client端設定
======================

.. note::

    設定檔通常在 ``~/.ssh/config`` 或是 ``/etc/ssh/ssh_config``。

``ServerAliveInterval``
    設定一段時間，如果Client在這段時間內都沒從SSH Server收到資料，
    就發出一段訊息請SSH Server回應。這會讓連線不會呈現閒置狀態，
    避免防火牆或Router切斷你的連線。預設為 ``0`` ，不會發出任何訊息。

``ServerAliveCountMax``
    設定在SSH Server沒回應的情況下，Client最多要送幾次請求回應的訊息
    （上面提到的那個）。達到此次數後，Client就會切斷與SSH Server之間的連線。
    這個主要是避免在SSH Server已經無法連線後，
    Client還不斷送出請求回應的情況。預設為 ``3`` 。


autossh：自動重啟SSH連線
========================

`autossh <https://linux.die.net/man/1/autossh>`_
是一支可以幫你監控SSH連線狀態並自動重連的程式。如果你的網路狀況很糟糕，
或是防火牆會三不五時把你斷線，他可以幫你自動重啟連線。

Fail2Ban：阻擋不明連線
======================

`Fail2Ban <https://www.fail2ban.org/wiki/index.php/Main_Page>`_
可以幫你阻擋不明連線，原理就是去監看SSH服務的log來偵測登入失敗的IP，
然後在這些IP的失敗次數達到一定值時，利用防火牆來暫時停止該IP的連線請求，
過一定時間後再恢復。可以拿來擋掉最基本的暴力攻擊。

如果你租了線上主機來玩，建議最少要裝Fail2Ban來保護你的SSH Server。

Port Knocking：有條件的開啟SSH Port
===================================

`Port Knocking <https://en.wikipedia.org/wiki/Port_knocking>`_
指的是Client必須用特殊的順序來對SSH Server上的某些Port發出連線請求後，
SSH Server才會開放Client連線的技巧（比如依序對Port 1000、2000、3000發出請求，
才會對你開放Port 22）。這樣的好處是平時Port 22就會是關閉的狀態，
讓攻擊者以為SSH沒有開放，減少被攻擊的機會。我沒用過，但看起來會搭配其他服務（
像 `knockd <https://linux.die.net/man/1/knockd>`_ ）一起用。

**********
References
**********

- ``man ssh``

- `SOCKS (Wiki) <SOCKS_>`_

- `SSH Port Forwarding Example`_

- `A Guide to SSH Port Forwarding/Tunnelling`_

.. _SOCKS: https://zh.wikipedia.org/wiki/SOCKS

.. _SSH Port Forwarding Example: https://www.ssh.com/ssh/tunneling/example

.. _Tinyproxy: http://tinyproxy.github.io/

.. _A Guide to SSH Port Forwarding/Tunnelling: https://www.booleanworld.com/guide-ssh-port-forwarding-tunnelling/

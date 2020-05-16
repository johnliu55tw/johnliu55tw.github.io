##################
SSH Tunneling 詳解
##################

:date: 2020-04-25
:modified: 2020-04-25
:category: SSH, Linux
:tags: SSH, Linux, Tunneling, Port Forwarding
:summary: 詳細解釋使用SSH的Local Port Forwarding、Remote Port Forwarding、
          和Dynamic Port Forwarding來建立加密通道（Tunneling）的方法。

*************************
Port Fowarding 的角色定義
*************************

不管是Local還是Remote Port Forwarding，都會有下面這三個角色：

Client
    - 任何你可以敲 ``ssh`` 指令的機器

SSH Server
    - 可以被 **Client** 用SSH連進去的機器

Target Server
    - 某台你想對外開啟的機器
    - **注意** ， **Client** 與 **SSH Server** 本身都可以是 **Target Server** ，
      不是真的要有三台機器才可以進行Port Forwarding！

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

使用情境
========

1. 連到位在防火牆後的伺服器上的服務
-----------------------------------

有一台位於防火牆後的伺服器上架了某個服務在Port 8080上，
但防火牆只開放Port 22的SSH連線，讓你無法直接連到Port 8080，
這時候就可以利用SSH Local Forwarding來把你電腦上的某個Port（假設為9090）
將資料轉發（Forward）到伺服器的Port 8080。

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
在這之後，連上你的電腦的Port 9090就等於連上了防火牆後的伺服器的Port 8080 ，
這樣一來就成功的繞過了防火牆的限制！

.. note::

    - 你完全可以在你的電腦上用相同的Port number來做Port Forwarding，
      這邊用 ``9090`` 只是為了避免混淆：

      .. code-block:: general

          ssh -L 8080:localhost:8080 johnliu@my-server

    - 如果你沒有給 ``bind_address`` ，預設會Bind在 ``localhost`` 上。
      如果你想把 Port ``9090`` 開放給所有人用：

      .. code-block:: general

          ssh -L 0.0.0.0:9090:localhost:8080 johnliu@my-server

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

使用情境
========

1. 透過對外機器，讓其他人能夠連到你的電腦上的服務
-------------------------------------------------

你在你的電腦上開發完了一個服務，架在Port 8080上想要Demo給客戶看，
但你的電腦只有內部IP，所以無法從Internet連上。
這時候利用SSH Remote Forwarding，
就可以藉由一台有Internet IP的對外機器，將上面的某個Port（假設為9090），
讓客戶連到你的電腦上Port 8080的服務。

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
接著，當客戶連上對外機器的Port 9090，就等於是連上了你的電腦的Port 8080，
這樣一來就可以將你的服務對外開放。

.. warning::

    基於安全考量，**Remote Forwarding預設都只能夠bind在localhost上** ，
    所以預設是無法從外部連到的。
    你必須調整SSH Server上的SSH服務的設定檔（一般在 ``/etc/ssh/sshd_config`` ）
    加入 ``GatewayPorts`` 設定，才能讓所有人都連到：

    .. code-block:: general

        GatewayPorts no

    這邊有三個選項：預設為 ``no`` ，也就是唯一指定localhost；
    設定為 ``yes`` 可以唯一指定為wildcard（ ``0.0.0.0`` ）；
    設定為 ``clientspecified`` 可以讓啟動Remote Forwarding的Client自行指定。

2. 透過對外機器，從外面連回內部網路上的服務
-------------------------------------------

有一個在內網裡的內部服務，你的電腦可以用IP ``192.168.1.100``
和Port 8080連到這個服務，但因為都在內網所以大家都沒有Internet IP，
所以你無法從外面連回來。藉由Remote Forwarding和一台對外機器，
可以讓你從任何地方連回這個服務。

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
這樣子，只要連到 ``external-server:9090`` 就等於是連到內網的服務
``192.168.1.100:8080`` 。

這應該是SSH Port Forwarding最強大的功能了。只要在網路上租一台最便宜的主機
（Linode, Digital Ocean, ...），你就可以拿他來當跳板，
透過這邊提到的方式來連回內部網路上的服務。

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

使用情境
========

1. 建立一個HTTP代理伺服器連到內網的所有HTTP(S)服務
--------------------------------------------------

只要有一台位於內網但具有外部IP的機器，讓你能夠從外面連到他，
你就可以利用這個方法建立一個HTTP代理伺服器，
讓你能夠從外面連回內網裡的所有HTTP(S)服務。

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
只要你的Client有支援SOCKS協定，透過這個代理伺服器讓你想怎麼轉就怎麼轉。
不過這方式也不是沒缺點，就是那台轉送用的機器一定得要有對外IP，
這樣才能夠從你的電腦連回來。

**********
References
**********

- `SOCKS (Wiki) <SOCKS_>`_

.. _SOCKS: https://zh.wikipedia.org/wiki/SOCKS

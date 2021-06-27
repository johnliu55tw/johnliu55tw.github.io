############
3D列印二三事
############

:date: 2021-06-25
:category: 3D Printing
:tags: 3D Printing
:summary: 關於我玩3D列印的事

.. admonition:: 變更記錄

   2020-06-27
      加入「 `OctoPrint`_ 」

這篇無關技術，單純想講一下我玩3D列印一年多來的故事呵呵。

我一直都很喜歡DIY、自己弄東弄西的感覺。唸大學的時候把KTR給大改成Cafe Racer；
租空房買了幾萬塊的Ikea傢俱全部自己組；選用ArchLinux把自己的Linux給拼湊起來。
雖然很累，但我很享受這些過程。

也忘了是為什麼，2019年時我偶然得知了「3D印表機」這個東西。
這玩意兒太讚了吧！只要電腦畫的出來，我就可以把他變成實體，想到就好爽啊！

所以在2019年底，我下定決心買了第一台3D印表機：
`Anycubic i3 Mega S <https://www.anycubic.com/products/anycubic-i3-mega-s>`_ 。

靠著這台機器我理解了3D列印的概念，
印了不少東西後秉持著DIY精神也改裝了不少東西上去，
從加燈條、燒客製Firmware、到自己設計Direct Extruder，玩的不亦樂乎。

.. figure:: {static}images/anycubic_i3.jpg
   :alt: Anycubic i3 Mega S最終型態
   :width: 600

   ..

   Anycubic i3 Mega S最終型態

到了2020年底，我發現大部分的時間我都是在「改進它」而不是「用它」，
覺得這樣下去好像不太對勁，我應該花多點時間在3D列印本身。
於是咧，趁著Cyber Monday免運活動訂了一台
`Prusa i3 MK3S+ <https://www.prusa3d.com/original-prusa-i3-mk3/>`_ 。

Prusa是一間位於捷克的公司，
他們的Prusa i3系列是一台需要自己從零件開始組裝，
而且號稱同價格帶中列印品質最好的機器，但比起中國牌子的機器還是貴上不少
（749鎂不含運），所以當初猶豫超級久。

.. figure:: {static}images/prusa_assembling.jpg
   :alt: Prusa i3 assembling
   :width: 800

   ..

   Prusa i3 MK3S+組裝過程

組裝花了我兩天的時間，不過他開始印的時候真的超有成就感，
印出來的品質也不是開玩笑，跟Anycubic真的有差。

.. figure:: {static}images/prusa_benchy.jpg
   :alt: Prusa Benchy
   :width: 800

   ..

   Prusa i3 MK3S+印出來的Benchy

**「你終究要開歐洲車的，那為什麼不一開始就開呢？」**

欸，不過作為入門，Anycubic還是相當稱職的，而且拆拆裝裝改來改去比較不會心痛。

**********
線材防潮箱
**********

既然升級了印表機，週邊也要跟著升級一下。

Prusa i3和Anycubic i3這個型式（FDM，其他還有SLS、SLA等）的3D印表機需要「線材」（Filament）
當原料來印出成品， 而線材又有分不同的塑膠材質，像是PLA、PETG、ABS等等。
而某些材質容易受潮，受潮後會造成印出成品品質變差，強度變低，
甚至印到一半就失敗。

.. figure:: {static}images/wet_filament.jpg
   :alt: 受潮後印出來的成品
   :width: 800

   Source: `MatterHacker <https://www.matterhackers.com/news/filament-and-water>`_

   乾燥和受潮線材印出成品比較，可以看到受潮線材的表面相當粗糙

其中一個解決方法是 **讓線材在使用前變乾燥** 。我一開始是用這個方法，
因為只要拿一台食物乾燥機來改裝一下就行了。甚至如果有溫控烤箱，
使用之前拿線材低溫烘烤一下也可以，便宜又簡單。

.. figure:: {static}images/diy_filament_dryer.jpg
   :alt: DIY線材乾燥機
   :width: 800

   ..

   DIY線材乾燥機

不過每次使用前都要烘它個兩三小時，久了也是有點煩。
所以之後決定採用另一個方法， **讓線材由始至終都待在乾燥的環境中** ，
連受潮的機會都不讓它有。而關於這種東西，網路上有相當多的資源可以參考，
來自已DIY。這邊貼一個我很喜歡的頻道 **CNC Kitchen** 實作
線材防潮箱的影片：

.. youtube:: WEFtUKGAd7k 
   :class: youtube-16x9
   :width: 800
   :height: 450

這箱子的基本概念很簡單：

1. 找一個夠大的密封式防潮箱

2. 裡面加個支架放線材卷（Filament Spool）

3. 鑽幾個洞讓線材能出入

4. 把除濕劑倒進去，再放一台濕度計監控濕度

5. 蓋子蓋起來

聽起來很簡單嘛，所以我就做了一個：

.. figure:: {static}images/dry_box.jpg
   :alt: DIY Dry Box
   :width: 800

   ..

   我的DIY線材防潮箱

跟影片裡的比起來，我另外設計了 **外部線材架** 。
因為某些線材不易受潮，所以可以放在一般環境中也不會影響品質。
所以我在箱蓋上另外設計了支架來放這些線材。

.. figure:: {static}images/dry_box_top_rack_3.jpg
   :alt: DIY Dry Box Top Rack
   :width: 800

   ..

   外部線材架

放線材的桿子都是8mm的碳纖維棒，而且兩側都有軸承來讓它可以滑順的滾動。
用碳纖維棒只是因為找不到同規格的金屬棒，絕對不是因為碳纖維比較潮。

.. figure:: {static}images/dry_box_bearing.jpg
   :alt: DIY Dry Box Bearing Rod
   :width: 800

.. figure:: {static}images/dry_box_top_rack_2.jpg
   :alt: DIY Dry Box Top Rack Bearing
   :width: 800

.. figure:: {static}images/dry_box_inside_rack.jpg
   :alt: DIY Dry Box Inside Rack Bearing
   :width: 800

利用PTFE Tube加上我自己設計的支架讓線材能順利的走到印表機：

.. figure:: {static}images/ptfe_rack.jpg
   :alt: 線材走線支架
   :width: 800

   ..

   PTFE Tube + 支架

我設計了一個零件讓PTFE Tube可以固定在Extruder上：

.. figure:: {static}images/ptfe_tube_cap.jpg
   :alt: PTFE Tube Cap
   :width: 800

   ..

   PTFE Tube Cap

設計這個零件很簡單，因為Prusa i3系列印表機是open-sourced！
所以可以直接拿到這個零件的STL檔進行修改。

把箱子跟印表機組合在一起最後長這樣：

.. figure:: {static}images/dry_box_all.jpg
   :alt: DIY Dry Box with Prusa i3
   :width: 800

   ..

   指揮艇組合

**這東西好用到不行啊！** 不但能保持線材乾燥，閒置的線材現在也有地方放了，
不會滾來滾去的，超方便。

*********
OctoPrint
*********

不管是Anycubic i3 Mega S或是Prusa i3 MK3S+，要開始列印都有個繁雜的流程：

1. 把SD卡插到電腦上

2. 把Slicer產生出來的 ``.gcode`` 檔從電腦放到SD卡上

3. 把SD卡從電腦拔出來，插到印表機上

4. 從印表機選擇SD卡上的檔案，開始列印

.. figure:: {static}images/prusa_sdcard.jpg
   :alt: Prusa i3 SD card
   :width: 800

   ..

   Prusa i3 MK3S+ SD卡列印介面

有些近期推出的3D印表機已經內建WiFi功能，換句話說就是能夠透過網路來傳輸
``.gocde`` 檔，不用再插插拔拔的了。
而為了讓Prusa i3 MK3S+能夠支援網路列印，我們可以透過
`OctoPrint <https://octoprint.org/>`_ 這個open-source專案來達成。

.. figure:: {static}images/octoprint_logo.png
   :alt: OctoPrint Logo
   :width: 600
   :target: https://octoprint.org/

OctoPrint提供了一個Web UI讓使用者能夠遠端監控印表機目前的狀態，
以及將 ``.gcode`` 檔「串流」至印表機的功能。也就是這個「串流」功能，
讓我們可以遠端列印，不用再透過SD卡了。

.. figure:: {static}images/octoprint_ui.png
   :alt: OctoPrint UI
   :width: 800

   ..

   OctoPrint Web UI

有了OctoPrint之後，列印流程變成了：

1. 把Slicer產生出來的 ``.gcode`` 檔透過Web UI上傳至OctoPrint

2. 從OctoPrint Web UI指示3D印表機開始列印這個 ``.gcode`` 檔

同時我們也可以從Web UI上監控列印過程，舒服。

OctoPi
======

OctoPrint是用Python寫的，並使用USB介面跟3D印表機溝通，
所以基本上任何 **有USB且能跑Python的平台** 都可以安裝OctoPrint。
不過大家最常用的還是Raspberry Pi，因為便宜好取得，且OctoPrint官方也提供
`OctoPi <https://octoprint.org/download/>`_ 這個image可以直接將OctoPrint
佈署至Raspberry Pi上。我原本是拿一塊閒置的Beaglebone Black來跑，
但跑起來實在是相當慢…所以最後還是買了二手Raspberry Pi 3B來佈署。

.. figure:: {static}images/octopi.jpg
   :alt: OctoPi
   :width: 600

   ..

   Raspberry Pi 3B與Prusa i3 MK3S+

另外呢，OctoPrint還有各式各樣的Plugin可以裝，像是
`Firmware Updater <https://github.com/OctoPrint/OctoPrint-FirmwareUpdater/blob/master/README.md>`_
能夠遠端更新印表機Firmware、
`Bed Visualizer <https://github.com/jneilliii/OctoPrint-BedLevelVisualizer>`_
能夠看到Bed Leveling的狀態等，實在好用，建議有3D印表機但還沒裝OctoPrint的一定要試一下。

********
印列成品
********

這邊放一些我自己設計的小東西。

筆電立架
========

我的螢幕、鍵盤、滑鼠都是外接的，所以筆電其實沒有必要打開。
為了節省空間，我想要把筆電立起來藏在螢幕後面，所以設計了一個立架來放。

.. figure:: {static}images/laptop_rack.jpg
   :alt: 筆電立架
   :width: 800

.. figure:: {static}images/laptop_rack_detail.jpg
   :alt: 筆電立架獨照
   :width: 800

   ..

   筆電立架

USB Hub 支架
============

同樣是為省空間（房間是有多小）跟整線，我設計了一個USB Hub的支架，
把我用的USB Hub固定在螢幕架上，讓整體更乾淨。

.. figure:: {static}images/usb_hub_rack.jpg
   :alt: USB Hub 支架
   :width: 800

   ..

   USB Hub 支架

Raspberry Pi 4 Platform 
=======================

自從Raspberry Pi 4有了USB 3.0後，外接SSD變成很合理的選擇，
所以我設計了一個SATA SSD Mount把Raspberry Pi跟SSD結合在一起。
另外為了實驗需求也設計了一個支架來裝些按鈕跟LED。

這邊要提一下Raspberry Pi本體的Case並不是我設計的，而是Thingiverse上找的：
`Raspberry Pi 4 snap fit case with 30mm Fan <https://www.thingiverse.com/thing:3726254>`_
。

.. figure:: {static}images/rpi4_mount.jpg
   :alt: Raspberry Pi 4 Mount
   :width: 800

   ..

   Raspberry Pi 4 Mount（請忽略上面的灰塵）

可調式電源供應器
================

自己有時候會玩一些微控制器等等的東西，
這時候就需要一台可調式電源供應器（Bench Power Supply）啦。
買了一些DIY零件後自己設計個外殼把它們裝起來。

.. figure:: {static}images/bench-power-supply/front.jpg
   :alt: Bench Power Supply Front
   :width: 800

.. figure:: {static}images/bench-power-supply/back.jpg
   :alt: Bench Power Supply Back
   :width: 800

.. figure:: {static}images/bench-power-supply/inside.jpg
   :alt: Bench Power Supply Inside
   :width: 800

.. figure:: {static}images/bench-power-supply/on.jpg
   :alt: Bench Power Supply Power On
   :width: 800

   ..

   DIY Bench Power Supply（請忽略要印超久懶得再印一次所以顏色不太搭的上蓋）

----

我還記得剛拿到第一台印表機時，我常常可以盯著列印過程幾十分鐘沒問題，
看到自己設計的東西一小步一小步被印出來的感動之情難以言語啊！
尤其印完之後拿在手上的感覺，真的是滿足到不行。

先分享到這裡，有興趣我再多寫一點。

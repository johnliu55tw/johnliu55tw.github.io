var tipuesearch = {"pages":[{"title":"About","text":"唸機械工程的軟體工程師。相信不管是機械還是軟體，能解決問題的就是好工程師 目前主要使用 Python，也寫過 C/C++ 和 JavaScript。相信有測試且容易理解的程式碼就是好程式碼","tags":"pages","url":"https://johnliu55.tw/pages/about.html","loc":"https://johnliu55.tw/pages/about.html"},{"title":"3D列印二三事","text":"這篇無關技術，單純想講一下我玩 3D 列印一年多來的故事呵呵。 我一直都很喜歡 DIY、自己弄東弄西的感覺。唸大學的時候把 KTR 給大改成 Cafe Racer；租空房買了幾萬塊的 Ikea 傢俱全部自己組；選用 ArchLinux 把自己的 Linux 給拼湊起來。雖然很累，但我很享受這些過程。 也忘了是為什麼，2019 年時我偶然得知了「3D 印表機」這個東西。這玩意兒太讚了吧！只要電腦畫的出來，我就可以把他變成實體，想到就好爽啊！ 所以在 2019 年底，我下定決心買了第一台 3D 印表機： Anycubic i3 Mega S 。 靠著這台機器我理解了 3D 列印的概念，印了不少東西後秉持著 DIY 精神也改裝了不少東西上去，從加燈條、燒客製 Firmware、到自己設計 Direct Extruder，玩的不亦樂乎。 Anycubic i3 Mega S 最終型態 到了 2020 年底，我發現大部分的時間我都是在「改進它」而不是「用它」，覺得這樣下去好像不太對勁，我應該花多點時間在 3D 列印本身。於是咧，趁著 Cyber Monday 免運活動訂了一台 Prusa i3 MK3S+ 。 Prusa 是一間位於捷克的公司，他們的 Prusa i3 系列是一台需要自己從零件開始組裝，而且號稱同價格帶中列印品質最好的機器，但比起中國牌子的機器還是貴上不少（749 鎂不含運），所以當初猶豫超級久。 Prusa i3 MK3S+ 組裝過程 組裝花了我兩天的時間，不過他開始印的時候真的超有成就感，印出來的品質也不是開玩笑，跟 Anycubic 真的有差。 Prusa i3 MK3S+ 印出來的 Benchy 「你終究要開歐洲車的，那為什麼不一開始就開呢？」 欸，不過作為入門，Anycubic 還是相當稱職的，而且拆拆裝裝改來改去比較不會心痛。 線材防潮箱 既然升級了印表機，週邊也要跟著升級一下。 Prusa i3 和 Anycubic i3 這個型式（FDM，其他還有 SLS、SLA 等）的 3D 印表機需要「線材」（Filament）當原料來印出成品， 而線材又有分不同的塑膠材質，像是 PLA、PETG、ABS 等等。而某些材質容易受潮，受潮後會造成印出成品品質變差，強度變低，甚至印到一半就失敗。 Source: MatterHacker 乾燥和受潮線材印出成品比較，可以看到受潮線材的表面相當粗糙 其中一個解決方法是 讓線材在使用前變乾燥 。我一開始是用這個方法，因為只要拿一台食物乾燥機來改裝一下就行了。甚至如果有溫控烤箱，使用之前拿線材低溫烘烤一下也可以，便宜又簡單。 DIY 線材乾燥機 不過每次使用前都要烘它個兩三小時，久了也是有點煩。所以之後決定採用另一個方法， 讓線材由始至終都待在乾燥的環境中 ，連受潮的機會都不讓它有。而關於這種東西，網路上有相當多的資源可以參考，來自已 DIY。這邊貼一個我很喜歡的頻道 CNC Kitchen 實作線材防潮箱的影片： 這箱子的基本概念很簡單： 找一個夠大的密封式防潮箱 裡面加個支架放線材卷（Filament Spool） 鑽幾個洞讓線材能出入 把除濕劑倒進去，再放一台濕度計監控濕度 蓋子蓋起來 聽起來很簡單嘛，所以我就做了一個： 我的 DIY 線材防潮箱 跟影片裡的比起來，我另外設計了 外部線材架 。因為某些線材不易受潮，所以可以放在一般環境中也不會影響品質。所以我在箱蓋上另外設計了支架來放這些線材。 外部線材架 放線材的桿子都是 8mm 的碳纖維棒，而且兩側都有軸承來讓它可以滑順的滾動。用碳纖維棒只是因為找不到同規格的金屬棒，絕對不是因為碳纖維比較潮。 利用 PTFE Tube 加上我自己設計的支架讓線材能順利的走到印表機： PTFE Tube + 支架 我設計了一個零件讓 PTFE Tube 可以固定在 Extruder 上： PTFE Tube Cap 設計這個零件很簡單，因為 Prusa i3 系列印表機是 open-sourced！所以可以直接拿到這個零件的 STL 檔進行修改。 把箱子跟印表機組合在一起最後長這樣： 指揮艇組合 這東西好用到不行啊！ 不但能保持線材乾燥，閒置的線材現在也有地方放了，不會滾來滾去的，超方便。 印列成品 這邊放一些我自己設計的小東西。 筆電立架 我的螢幕、鍵盤、滑鼠都是外接的，所以筆電其實沒有必要打開。為了節省空間，我想要把筆電立起來藏在螢幕後面，所以設計了一個立架來放。 筆電立架 USB Hub 支架 同樣是為省空間（房間是有多小）跟整線，我設計了一個 USB Hub 的支架，把我用的 USB Hub 固定在螢幕架上，讓整體更乾淨。 USB Hub 支架 Raspberry Pi 4 Platform 自從 Raspberry Pi 4 有了 USB 3.0 後，外接 SSD 變成很合理的選擇，所以我設計了一個 SATA SSD Mount 把 Raspberry Pi 跟 SSD 結合在一起。另外為了實驗需求也設計了一個支架來裝些按鈕跟 LED。 這邊要提一下 Raspberry Pi 本體的 Case 並不是我設計的，而是 Thingiverse 上找的： Raspberry Pi 4 snap fit case with 30mm Fan 。 Raspberry Pi 4 Mount（請忽略上面的灰塵） 可調式電源供應器 自己有時候會玩一些微控制器等等的東西，這時候就需要一台可調式電源供應器（Bench Power Supply）啦。買了一些 DIY 零件後自己設計個外殼把它們裝起來。 DIY Bench Power Supply（請忽略要印超久懶得再印一次所以顏色不太搭的上蓋） 我還記得剛拿到第一台印表機時，我常常可以盯著列印過程幾十分鐘沒問題，看到自己設計的東西一小步一小步被印出來的感動之情難以言語啊！尤其印完之後拿在手上的感覺，真的是滿足到不行。 先分享到這裡，有興趣我再多寫一點。","tags":"3D Printing","url":"https://johnliu55.tw/3d-printing-stuff.html","loc":"https://johnliu55.tw/3d-printing-stuff.html"},{"title":"為何需要 Async/await 語法？","text":"近年來有許多語言都加入了 Async/await 這個語法來幫助開發者撰寫非同步程式碼，其中不乏像 JavaScript 與 Python 等熱門語言，和 Rust 這樣的靜態形別語言。這邊就記錄一下我自己對它的看法。 TL;DR 我認為，使用 async 與 await 來寫非同步的程式碼，最大的好處在於你可以用 同步程式設計的程式碼架構來實作非同步的邏輯 。 三個 HTTP 請求與他們的回呼 譬如，今天你想使用某個部落格的 API 來取得 某個作者 寫的 最新文章 上的 最新評論 ，然後拿它來做某件事。以同步的架構來寫的話，你可能會這樣子發送 HTTP 請求： function doStuff ( user_id ) { try { let user = syncHttpGet ( '/api/users/' + user_id ); let post = syncHttpGet ( '/api/posts/' + user . posts [ 0 ]. id ); let comment = syncHttpGet ( '/api/comments/' + post . comments [ 0 ]. id ); doSomethingToComment ( comment ); } catch ( e ) { setGetCommentError ( e ); } } 這是個很常見的模式： 需要使用上一個請求所得到的回覆來發送下一個 。以同步的程式碼來實作的話： 邏輯簡單明瞭，一眼就可以看出做了哪些事 可以直接利用語言本身的錯誤處理機制（try-catch） 不過在單執行緒的情況下，同步設計最大問題在於每一個 syncHttpGet 都是以 Blocking 的方式在執行，所以在得到回覆之前是不會釋放該執行緒的。以前端來說，這會造成 整個 UI 會被凍結，完全無法處理使用者的其他操作 。於是乎，前端或是 UI 相關的東西基本都採用非同步程式設計（Asynchronous Programming）來實作。 還記得我第一次接觸到非同步程式設計，最難就難在理解 非同步函式不會直接把結果 Return 給你 這件事。啊這樣我是要怎樣拿到結果啦，我下一個請求要怎麼發？ 要解決這問題有幾種方法，不過在 JavaScript 的世界裡，這些非同步操作通常都會以 接收函式為引數的函式 來實作，把最後得到的結果直接丟給你所指定的函式。這樣一來就算不 Return 值回去，也可以繼續下個動作。 這個被傳進去的函式就稱為「回呼函式」（Callback Function）。用這個概念來實做同樣的邏輯大概會長這樣： function doStuff ( user_id ) { callbackHttpGet ( '/api/users/' + user_id , function ( resp ) { if ( resp . statusCode === 200 ) { callbackHttpGet ( '/api/posts/' + resp . data . posts [ 0 ]. id , function ( resp ) { if ( resp . statusCode === 200 ) { callbackHttpGet ( '/api/comments/' + resp . data . comments [ 0 ]. id , function ( resp ) { if ( resp . statusCode === 200 ) { let comment = resp . data ; doSomethingToComment ( comment ); } else { setGetCommentError ( 'Cannot get comment detail' ); } }) } else { setGetCommentError ( 'Cannot get post' ); } }) } else { setGetCommentError ( 'Cannot get user' ); } }) } 對，這就是回呼地獄（Callback Hell） 。因為必須在得到回覆後 用裡面的資料再次進行非同步操作 ，於是就出現了在回呼中再次使用回呼的模式。對，它會動，但很傷眼… 層層套疊的金字塔狀程式碼，很難一眼看出內部邏輯 不斷重覆出現的 if..else 錯誤處理邏輯。另外，如果我只在乎最後的 comment ，中間的每個 setGetCommentError 都是多餘的程式碼。 相信很多人都深受其害，迷失在這個地獄… It Will Be Fun, I Promise 你的聲音， ES6 聽到了，於是就出現了 Promise 這個結構來擺脫回呼地獄，讓你可以用 Method chaining 的方式來串連這些 HTTP 請求，而不是一層包一層的模式： function doStuff ( user_id ) { asyncPromiseGet ( '/api/users/' + user_id ) . then ( function ( resp ) { return asyncPromiseGet ( '/api/posts/' + resp . data . posts [ 0 ]. id ); }) . then ( function ( resp ) { return asyncPromiseGet ( '/api/comments/' + resp . data . comments [ 0 ]. id ); }) . then ( function ( resp ) { let comment = resp . data ; doSomethingToComment ( comment ); }) . catch ( function ( err ) { setGetCommentError ( err ); }) } asyncPromiseGet 函式會回傳一個 Promise 物件，上面有一個 then() 方法接收一個回呼函式為引數，並在得到 HTTP 回覆時呼叫這個函式。同時 then() 方法也會 回傳一個新的 Promise 物件 ，讓你可以一直 .then() 下去。 註釋 其實 then() 方法可以接收兩個函式引數，這邊為了簡單起見只說明傳一個的情況，細節請看 Using Promises 。 Promise 真正厲害的地方在於，如果你給 then() 的回呼函式也回傳了 Promise 物件，那麼這個 Promise 最後得到的值， 會被送到 then() 所回傳的那個新的 Promise 上 ，讓下一個串起來的 then() 能夠取得你的回呼函式想要得到的結果。就是因為這個原因，我們才能夠使用 Method chaining 而不是巢狀的方式來串連這些 HTTP 請求。 Promise 讓金字塔消失了，而且也簡化了錯誤處理的機制，可以看到我只要最後加個 .catch() 就能夠統一處理錯誤。然而，這還是逃不了回呼的概念，與同步版本相較之下還是沒那麼優雅。 媽，可以不要回呼嗎？ 就在我以為這輩子就這樣子了的時候， ES8 出現了 async 與 await： async function doStuff ( user_id ) { try { let user = await asyncHttpGet ( '/api/users/' + user_id ); let post = await asyncHttpGet ( '/api/posts/' + user . posts [ 0 ]. id ); let comment = await asyncHttpGet ( '/api/comments/' + post . comments [ 0 ]. id ); doSomethingToComment ( comment ); } catch ( e ) { setGetCommentError ( e ); } } 可以看到，除了出現 await 跟 async 這幾個字以外，基本上程式碼的架構與同步版的一模模一樣樣，也可以用語言原生的 try catch 機制來進行錯誤處理，超讚的啦！ 值得注意的是，async/await 看起來是全新的概念， 但其實這兩個語法是 由 Promise 和生成器（Generator） 來實作的。你可以試著在 Node.js 裡定義一個 async 函式並直接呼叫它： > async function f () { return 1 ; } undefined > f () Promise { 1 } 可以看到 async 函式回傳的其實是 Promise。對背後實作有興趣可以去 Google 一下，或是去翻一下 忍者：JavaScript 開發技巧探秘 第二版 這本書的第六章，裡面有很詳細的解釋。 這篇就寫到這…下一篇可能會來聊聊 Python 的 asyncio 吧…？ References 忍者：JavaScript 開發技巧探秘 第二版 Using Promises - MDN Async/Await - JAVASCRIPT.INFO","tags":"Programming Language","url":"https://johnliu55.tw/async-await-why.html","loc":"https://johnliu55.tw/async-await-why.html"},{"title":"SSH Tunneling (Port Forwarding) 詳解","text":"變更記錄 2020-05-25 加入「 補充：小技巧和工具 」章節來放各種 SSH Tunneling 的小技巧和工具。 前陣子研究了一下用 SSH Tunneling 來連到內部網路的方法，一開始實在有點難理解 SSH 指令與實際情況的關係，但了解後才發現他超級強大，於是就把細節記錄下來之後可以參考，也希望能幫大家了解一下這東西。 什麼是 SSH Tunneling (Port Forwarding)？ Tunneling 指的是將網路上的 A、B 兩個端點用某種方式連接起來，形成一個「隧道」，讓兩端的通訊能夠穿透某些限制（例如防火牆），或是能將通訊內容加密避免洩漏。而 SSH Tunneling 就是指利用 SSH 協定來建立這個隧道，所以不但能加密你的通訊，如果中間設有防火牆擋掉某些特定 Port 的連線（例如 HTTP/HTTPS 的 80/443）而沒有擋下 SSH 的 Port 22，這個隧道便會讓防火牆認為是只是一般的 SSH 連線，進而放行，也就達到了「穿透防火牆」的效果。 另外，因為 SSH Tunneling 的目標是兩個端點上的 Port，而過程就像是把對 A 點上的某個 Port X 所傳送的資料 轉送 （Forward）至 B 點上的 Port Y，所以 SSH Tunneling 又稱為 SSH Port Forwarding 。 SSH Port Forwarding 有下列三種模式： Local Port Forwarding Remote Port Forwarding Dynamic Port Forwarding 接下來會一一說明各種模式。先來看看在 SSH Port Forwarding 當中參與的角色有哪些。 Port Fowarding 裡的角色定義 對 Local 和 Remote Port Forwarding 來說，都會有下面這三個角色： Client 任何你可以敲 ssh 指令來啟動 Port Forwarding 的機器 SSH Server 可以被 Client 用 SSH 連進去的機器 Target Server 某一台你想建立連線的機器，通常是為了對外開放這台機器上的服務 注意 ， Client 與 SSH Server 本身都可以是 Target Server ，不是真的要有三台機器才可以進行 Port Forwarding！ 而 Dynamic Port Forwarding 比較不一樣，在於 Target Server 不會只有一台，而是可以被動態決定的。 了解了這三個角色，那就先來看看 Local Port Forwarding 是怎麼回事。 Local Port Forwarding 指令語法 ssh -L [bind_address:]<port>:<host>:<host_port> <SSH Server> 在 Client 上開啟 bind_address:port 等待連線，當有人連上時，將所有資料轉送到 host:host_port 去。 注意 ， host 是相對於 SSH Server 的位址，而不是 Client ！ 使用情境一：連到位在防火牆後的開發伺服器上的服務 你有一台位於防火牆後的開發伺服器， 你在上面架了某個服務在 Port 8080 上，但防火牆只開放 Port 22 的 SSH 連線，讓你無法從你的電腦直接連到 Port 8080，但你又很想連到他… 這時候只要你能夠 SSH 到那台伺服器，就可以利用 Local Port Forwarding 來開啟你電腦上的某個 Port（假設為 9090），將對它發送的資料轉送到伺服器的 Port 8080。這樣一來， 連上你的電腦的 Port 9090 就等於連上了防火牆後的伺服器的 Port 8080 ，也就繞過了防火牆的限制。 Client 你的電腦 SSH Server 防火牆後的伺服器 SSH Destination： johnliu@my-server Target Server 防火牆後的伺服器 SSH 指令： ssh -L 9090:localhost:8080 johnliu@my-server 這邊的 localhost 是相對於 johnliu@my-server ，指的就是防火牆後的伺服器本身。 註釋 你完全可以在你的電腦上用相同的 Port number 來做 Port Forwarding，這邊用 9090 只是為了避免混淆： ssh -L 8080:localhost:8080 johnliu@my-server 如果你沒有給 bind_address ，預設會 Bind 在 localhost 上。如果你想把 Port 9090 開放給所有人用： ssh -L 0.0.0.0:9090:localhost:8080 johnliu@my-server 使用情境二：透過防火牆後的機器，連到防火牆後的特定服務 情境一有用的前提是 你能夠 SSH 到提供服務的伺服器裡 ，但今天如果你沒有權限，無法 SSH 進到提供服務的伺服器，那該怎麼辦呢？ 沒問題！只要你在防火牆後有任何一台你可以 SSH 的機器，接著修改一下指令裡的 host 設定，你就可以利用這台機器進行資料轉送： Client 你的電腦 SSH Server 防火牆後你的機器 SSH Destination： johnliu@my-server Target Server 防火牆後的伺服器 192.168.1.101:8080 SSH 指令： ssh -L 9090:192.168.1.101:8080 johnliu@my-server 這邊的 192.168.1.101 是相對於 johnliu@my-server ，所以是防火牆後的伺服器的 IP 位址。 Remote Port Forwarding 指令語法 ssh -R [bind_address:]<port>:<host>:<host_port> <SSH Server> 在 SSH Server 上開啟 bind_address:port 等待連線，當有人連上時，將所有資料轉送到 host:host_port 去。 注意 ， host 是相對於 Client 的位址，而不是 SSH Server ！ 使用情境一：透過對外機器，讓其他人能夠連到你的電腦上的服務 你在你的電腦上開發完了一個服務架在 Port 8080 上，然後你想要 Demo 給客戶看，但你的電腦只有內部 IP，所以無法讓客戶連進來： 這時候只要利用 SSH Remote Forwarding，就可以藉由一台有 Internet IP 的對外機器，開啟上面的某個 Port（假設為 9090）來轉送資料到你的電腦上的 Port 8080。這樣子，客戶只要連上對外機器的 Port 9090 就等於是連上了你電腦的 Port 8080。 Client 你的電腦 SSH Server 對外機器 SSH Destination： johnliu@external-server Target Server 你的電腦 SSH 指令： ssh -R 0.0.0.0:9090:localhost:8080 johnliu@external-server 這邊的 localhost 是相對於 Client ，指的就是你的電腦本身。 警告 基於安全考量， Remote Forwarding 預設都只能夠 bind 在 SSH Server 的 localhost 上 ，所以單靠以上指令是無法讓 Port 9090 開放給外部連線的。你必須調整 SSH Server 上的 SSH 服務的設定檔（一般在 /etc/ssh/sshd_config ）加入 GatewayPorts 設定，才能讓所有人都連到： GatewayPorts yes 這邊有三個選項：預設為 no ，也就是唯一指定 localhost；設定為 yes 可以唯一指定為 wildcard（ 0.0.0.0 ）；設定為 clientspecified 可以讓啟動 Remote Forwarding 的 Client 自行指定。 使用情境二：透過對外機器，從外面連回內部網路上的服務 有一個在內網裡的內部服務，你的電腦可以用 IP 192.168.1.100 和 Port 8080 連到這個服務，但因為都在內網所以大家都沒有 Internet IP，所以無法讓你從家裡透過 Internet 連回來： 這時候藉由 Remote Forwarding 和一台對外機器， 可以讓你從任何地方連回這個服務： Client 你的電腦 SSH Server 對外機器 SSH Destination： johnliu@external-server Target Server 內部服務 192.168.1.100:8080 SSH 指令： ssh -R 0.0.0.0:9090:192.168.1.100:8080 johnliu@external-server 在這裡， 192.168.1.100 是相對於你的電腦，所以就算外部機器連不到這個位址也沒關係，因為是透過你的電腦做資料轉送。這樣子，只要連到對外機器上的 Port 9090 就等於是連到內部服務上的 Port 8080 了，你就能夠從外部存取內網服務。 這應該是 SSH Port Forwarding 最強大的功能了！只要在網路上租一台最便宜的主機（Linode, Digital Ocean 之類的），就可以拿他來當圖示中的對外機器，來連回內部網路上的服務。不過前提是你得在有內網連線時將 Port Forwarding 設定好，如果你到家後才想到，那就請你再跑一趟吧… Dynamic Port Forwarding 指令語法 ssh -D [bind_address:]<port> <SSH Server> 在 SSH Server 上啟動一個 SOCKS 代理伺服器，同時在 Client 上開啟 bind_address:port 等待連線，當有人連上時，將所有資料轉送到這個 SOCKS 代理伺服器上，啟動相對應的連線請求。 使用情境：建立一個 HTTP 代理伺服器連到內網的所有 HTTP(S) 服務 只要有一台位於內網且 具有外部 IP 的機器，你就可以利用這個方法建立一個 HTTP 代理伺服器，讓你能夠從外面連回內網裡的所有 HTTP(S) 服務： Client 你的電腦 SSH Server 內網裡具有外部 IP 的機器 Target Server N/A SSH 指令： ssh -D 9090 johnliu@internal-machine 假設你是用 Linux 和 Chrome，你可以在你的電腦上用以下指令讓 Chrome 使用這個代理伺服器： google-chrome --user-data-dir=~/proxied-chrome --proxy-server=socks5://localhost:9090 註釋 這邊的 google-chrome 只是範例，不同的 Linux 發行版名字可能會不同 --user-data-dir 是為了讓 Chrome 能夠開啟一個新的 Chrome session，不加的話 --proxy-server 這個設定就沒用了 一般的 Port Forwarding 只能夠轉送 一個 IP 上的一個 Port ，當你有很多 IP 或很多 Port 想轉時就只能一個一個開， 很不方便。相比之下，Dynamic Port Forwarding 能直接架起一個代理伺服器，只要你用的程式有支援 SOCKS 協定，透過這個代理伺服器讓你想怎麼轉就怎麼轉。不過這方式也不是沒缺點，就是那台轉送用的機器一定得要有對外 IP，這樣才能夠從你的電腦連回來。 結論 從圖可以看出來，Local 跟 Remote Forwarding 的差異主要在 Port 開啟的地方 ：Local Forwarding 是將 Client 上的 Port 打開以供連線；Remote Forwarding 則是將 SSH Server 上的 Port 打開。另外要注意的點是轉送的目的地 host ：Local Forwarding 是相對於 SSH Server，而 Remote Forwarding 則是相對於 Client。 雖然 Dynamic Port Forwarding 的彈性更大，但條件就是 SSH Server 就必須要能夠從外面連回來。不過其實也是有 Workaround 啦，搭配一下 Port Forwarding 就行了，但這樣的話你有更好的 Proxy 選擇，像是 Tinyproxy 等等。 就寫到這邊，有問題也歡迎大家討論唷！ 補充：小技巧和工具 這邊放一些大家在使用 SSH Tunneling 上的小技巧和工具，但細節就請大家自行 Google 囉。 常用的 SSH 指令參數 -N 不要執行任何遠端指令。沒有加這個參數時，建立 Port Forwarding 的同時也會開啟 Remote Shell，讓你可以對 SSH Server 下指令，而這個參數可以讓 Remote Shell 不要打開。 -f 讓 ssh 指令在背景執行，讓你可以繼續用 Shell 做事情。通常會搭上面的 -N 使用。 常用的 SSH Client 端設定 註釋 設定檔通常在 ~/.ssh/config 或是 /etc/ssh/ssh_config 。 ServerAliveInterval 設定一段時間，如果 Client 在這段時間內都沒從 SSH Server 收到資料，就發出一段訊息請 SSH Server 回應。這會讓連線不會呈現閒置狀態，避免防火牆或 Router 切斷你的連線。預設為 0 ，不會發出任何訊息。 ServerAliveCountMax 設定在 SSH Server 沒回應的情況下，Client 最多要送幾次請求回應的訊息（上面提到的那個）。達到此次數後，Client 就會切斷與 SSH Server 之間的連線。這個主要是避免在 SSH Server 已經無法連線後，Client 還不斷送出請求回應的情況。預設為 3 。 autossh：自動重啟 SSH 連線 autossh 是一支可以幫你監控 SSH 連線狀態並自動重連的程式。如果你的網路狀況很糟糕，或是防火牆會三不五時把你斷線，他可以幫你自動重啟連線。 Fail2Ban：阻擋不明連線 Fail2Ban 可以幫你阻擋不明連線，原理就是去監看 SSH 服務的 log 來偵測登入失敗的 IP，然後在這些 IP 的失敗次數達到一定值時，利用防火牆來暫時停止該 IP 的連線請求，過一定時間後再恢復。可以拿來擋掉最基本的暴力攻擊。 如果你租了線上主機來玩，建議最少要裝 Fail2Ban 來保護你的 SSH Server。 Port Knocking：有條件的開啟 SSH Port Port Knocking 指的是 Client 必須用特殊的順序來對 SSH Server 上的某些 Port 發出連線請求後，SSH Server 才會開放 Client 連線的技巧（比如依序對 Port 1000、2000、3000 發出請求，才會對你開放 Port 22）。這樣的好處是平時 Port 22 就會是關閉的狀態，讓攻擊者以為 SSH 沒有開放，減少被攻擊的機會。我沒用過，但看起來會搭配其他服務（像 knockd ）一起用。 References man ssh SOCKS (Wiki) SSH Port Forwarding Example A Guide to SSH Port Forwarding/Tunnelling","tags":"SSH, Linux","url":"https://johnliu55.tw/ssh-tunnel.html","loc":"https://johnliu55.tw/ssh-tunnel.html"},{"title":"用 Pelican 寫中文文章","text":"變更記錄 2019-06-08 修正「解决 jekyll 中文换行变成空格的问题」這篇文章的連結。 想寫 Blog 很久了，一直覺得該找個地方記錄一下腦子裡的想法，不然我記性超級差，隔天就忘了自己到底在忙什麼。 那要用什麼寫？ 一般的 Blog 服務當然是不考慮，對 時常要放程式碼 的人來說完全不適合。 在很潮的 Medium 上寫過一篇文章，沒有原生支援 Code Syntax Highlighting 讓人非常消火，每次都得用 GitHub Gist 放程式碼實在有點麻煩。而且用 Vim + Markup Language 寫文件寫習慣了，對必須用滑鼠改格式這件事覺得不太順手。 Google 了一下，身為 Python 工程師及愛好者，用 Pelican 寫然後架在 GitHub Pages 上似乎是最好的選擇： 用 Python 寫的，可以用 Python 擴充和修改功能 支援 reStructuredText 及 Markdown 支援 Disqus 和 Google Analytic 等其他好用的服務 支援許多主題： Pelican Themes 讚，那就開始寫吧！ 當 Pelican 遇上中文 平常文件都是用英文在寫，當開始用 reStructuredText 寫起中文立刻覺得不太對勁…好像出現了很多不該出現的空格？ 詭異的空格們 換行變成了空格 我是龜毛人，原始碼的行數不超過 80 個字元是基本，最多也不能超過 100，所以很長的一個段落會用多行表示： 我是龜毛人 ， 原始碼的行數不超過 80 個字元是基本 ， 最多也不能超過 100 ， 所以很長的一個段落會用多行表示 ： reStructuredText 和 Markdown 都會保留這個換行字元到轉換後的 HTML 中： < p > 我是龜毛人 ， 原始碼的行數不超過 80 個字元是基本 ， 最多也不能超過 100 ， 所以很長的一個段落會用多行表示 ： </ p > 而瀏覽器在遇到這樣的換行字元時會將他轉換為空格，因為 Spec 就是這樣規定： An HTML user agent should treat end of line in any of its variations as a word space in all contexts except preformatted text. 這件事在英文很合理，但到了中文就不合理了， 因為我們不會用空格把文字隔開 。於是乎，上面的例子瀏覽器會顯示為： 我是龜毛人，原始檔的行數不超過 80 個字元是基本，100 則是最大值， 所以很長的一個段落會用多行表示： 注意到「所以」前面多了一個空格。如果你習慣很好，只有在使用標點符號之後才會換行，那看起來影響不大。但如果換行是介於兩個中文字之間，那就會 像這樣在文字間出現詭異的空格。 Inline Markup 的空格 不像 Markdown，reStructuredText 要求 必須用空格 （ 或其他類似功能的字元 ）將 Inline Markup 與其他的文字區隔開來： This is **inline markup** bold. 這樣的空格會被保留到 HTML： < p > This is < strong > inline markup </ strong > bold. </ p > 跟上面提到的一樣，這空格在英文沒差，中文就不行了。不過江湖在走，Workaround 要有，最簡單的方法是自己用 \\ 來「跳脫」這個空格： This is\\ **inline markup**\\ bold. 但每次都要手動加入這反斜線實在有點麻煩。如果這空格能自己消失，那該有多好。 Bonus：中英文間的空格 有研究顯示，打字的時候不喜歡在中文和英文之間加空格的人，感情路都走得很辛苦，有七成的比例會在 34 歲的時候跟自己不愛的人結婚，而其餘三成的人最後只能把遺產留給自己的貓。畢竟愛情跟書寫都需要適時地留白。 —— vinta/pangu.js …這種空格我個人是覺得還可以接受啦，不過如果 Pelican 能自動幫我加上這些空格，那我就不用擔心未來會跟不愛的人結婚了。寫程式真是份偉大的工作。 寫個 Pelican Plugin 吧！ 原本想說可以從處理 reStructuredText 的函式庫 docutils 下手，無奈功力不夠高深，看不出來到底該怎麼修改他的行為，只好從 Pelican 下手。 之前提到 Pelican 能夠用 Python 自己擴充功能，而在官方的 pelican-plugins 列表中搜尋了一下只有 cjk-auto-spacing 能夠自動調整中英文間的空格，但還是沒有解決所有的問題。Google 了一下找到這篇「 解决 jekyll 中文换行变成空格的问题 」，但他是用 Jekyll 而不是 Pelican。安捏…不如自己寫一個吧！ Pelican Plugin 的運作方式 Pelican 定義了各種「 信號 」（Signal），代表了從原始碼到最後生出 HTML 的各個 階段 。你可以將自己寫的 Python 函式 註冊 到這些信號上，Pelican 就會在那些 信號對應的階段發生時 呼叫你的函式，並將當下的狀態或處理的物件傳進這個函式，讓你的函式能夠調整 Pelican 的行為。細節和信號列表請參考 Pelican Plugin Document 。 前面提到了 cjk-auto-spacing ，理所當然拿他來參考一下。它處理的方式是使用信號 content_object_init 來取得 content_object 物件，而這個物件的 _content 屬性存放了從 reStructuredText 及 Markdown 原始碼轉換而來的 HTML ，以 str 儲存。我們可以根據需求來調整這個 HTML，調整完後再 assign 回 _content ，Pelican 就會用這份新的 HTML 繼續之後的工作。 舉例來說，如果我們想把 HTML 裡的所有 <p> Tag 換成 <foo> ，可以很快的用 Regular Expression 來達成： import re from pelican import signals def process ( content ): new_content = re . sub ( r '<(/)?p>' , r '<\\1foo>' , content . _content ) content . _content = new_content def register (): signals . content_object_init . connect ( process ) Pelican 規定每個 Plugin 都必須要有 register 函式，目的在指定你需要哪些信號以及他們要觸發的函式。 Pelican-CJK 花了些時間用 Regular Expression 刻了一個能夠自動處理以上問題的 Plugin： pelican-cjk 。它能夠自動根據你寫的內容調整 HTML，解決上述那些小毛病。 在開發這個 Plugin 的時候考慮了以下幾點： 必須支援 reStructuredText 及 Markdown 不想依賴其他第三方模組 如果要從原始碼（ .md 與 .rst ）或 Parser 下手，就還得考慮 reStructuredText 和 Markdown 的差異，所以如果兩個都得支援，直接從 HTML 下手會好處理很多。 而基於第二點， Beautiful Soup 等等能夠幫助處理 HTML 的模組也就不考慮了，而 Python 內建的 HTML Parser 又太陽春，所以最後我直接用 Regex 來處理。但這不免有些小問題： 無法判斷目前要調整的文字屬於那種區塊。reStructuredText 和 Markdown 都有所謂的「Literal Block」，在這個區塊內是不會處理任何標記的。 但因為程式無法根據 HTML 判斷區塊，它一樣會調整這個區塊內的文字。 不過 Literal Block 通常是用來放範例程式碼的，比較不會出現中英混用的情況，所以就我認為影響不大。 透過上述信號拿到的 HTML 不包含文章的標題 ，所以標題無法調整，得自己加入中英文間的空格。這應該可以透過其他信號取得，但我還沒研究。 為了簡單起見，我寫的 Regex 不會針對以下情況調整空格： 巢狀 Inline Markup：reStructuredText 不允許這種情況，也就是說 HTML 中不會出現 English<em><strong>斜體又粗體</strong></em> 這樣的東西。但 Markdown 允許，所以這是有機會出現的。以這個例子來說，「English」與「斜體又粗體」間就不會自動加空格。 連續 Inline Markup： <em>English</em><strong>很強</strong> 連續的兩個 Inline Markup 也需要額外判斷，而且使用情況也不多，所以在此也不考慮。 希望這個 Plugin 能夠幫助更多跟我一樣毛很多的人，如果大家有什麼更好的方法也歡迎一起討論。 References vinta/pangu.js 解决 jekyll 中文换行变成空格的问题","tags":"Python","url":"https://johnliu55.tw/when-pelican-meets-cjk.html","loc":"https://johnliu55.tw/when-pelican-meets-cjk.html"},{"title":"用 Python 控制其他行程的 TTY 終端裝置","text":"Foreword 這篇文章會稍微解釋 Unix 的 TTY 系統以及 Pseudo Terminal 的概念，接著討論如何使用 Python 的 pty 模組中的 pty.fork() 來建立並控制子行程的 TTY 系統，最後用 Python 來實作控制 madplay 這個 CLI MP3 Player。 有問題歡迎大家詢問，有任何錯誤也請大家幫忙指正 :D Python MP3 Player 這幾天在玩 ReSpeaker （一個基於 MT7688 的聲控裝置開發板）遇到了個問題：在 ReSpeaker 中要如何使用 Python 播放 MP3 檔案？ 好在 ReSpeaker 上已有 madplay 這個指令，能夠直接播放 MP3： $ madplay MP3_FILE 更讚的是只要加上 --tty-control 就能直接控制播放狀態！ $ madplay MP3_FILE --tty-control MP3_FILE 例如按下 p 就能控制音樂播放的暫停 / 繼續。很好！這樣就可以用 subprocess 模組啟動 madplay 來控制音樂播放啦！然後 對這個子行程的 stdin 寫入這些控制用的鍵應該就能控制音樂播放了吧？至少我是這樣想的… The mystery TTY 俗話說的好，代誌往往不是憨人所想的那麼簡單，試了幾回後發現竟然沒效？！一氣之下翻了翻 madplay 的原始碼，發現 player.c 裡有些跟 TTY 這玩意兒有關的程式碼： # define TTY_DEVICE \"/dev/tty\" ... tty_fd = open ( TTY_DEVICE , O_RDONLY ); ... count = read ( tty_fd , & key , 1 ); ... 玩過 Linux 的朋友們應該對 TTY 這個字有強烈的熟悉感，好像三不五時就會看到這東西出現。於是我拿他去 Google 後得到下面幾個結論： TTY 源自於 Teletype 這個單字，中文稱為 電傳打字機 ，是古早年代用來遠距離傳遞文字資訊用的機器以及機制。 很久很久以前並沒有 PC — Personal Computer 這種東西，有的只是一台螢幕加鍵盤組成的終端機，透過串列埠等等的傳輸方式與一台中央主機溝通，進行控制與運算的工作。Unix 下的 TTY 裝置概念就是從這裡出現的，細節可參考我列在最後面的 References。 TTY 裝置架構中有一層叫做 Line discipline 。這東西介於軟體層（行程接收到的資訊）和驅動層（實際上與硬體打交道那一層）間，負責對從其中一層傳遞過來的資訊做前處理，再傳到另一層。舉例像是 Line editing（Buffering、Backspace、Echoing、移動游標等…）、字元轉換（ \\n 與 \\r\\n 互相轉換…）、控制字元轉換為信號（ASCII 0x03→SIGINT）等等的功能。 /dev/tty 裝置代表的是 目前行程所連接著的終端（Terminal）裝置 。 從 player.c 中的程式碼看起來，madplay 是直接從 /dev/tty 這個裝置讀取鍵盤輸入，而不是從 stdin 讀取。聽起來有點多此一舉，但這麼做有個好處： 一個行程可以在從 stdin 接收資料的同時，接收來自鍵盤的訊息。 舉例來說， cat MP3_FILE | madplay -—tty-control - 這串指令中的 madplay 會讀取 stdin，而 cat MP3_FILE 這個指令會將 MP3_FILE 這個檔案輸出到 stdout，中間我們藉由 | 來將這些資料導向至 madplay 進行播放。在這一連串事情發生的同時，使用者同樣可以用鍵盤控制播放狀態。 既然如此，那有沒有辦法控制一個行程所連接著的終端裝置呢？更重要的是，Python 做的到嗎？ Pseudo Terminal 當然可以！針對控制一個行程的終端，Python 標準函式庫提供了 pty 這個模組來處理與 Pseudo Terminal 有關的概念。那什麼是 Pseudo Terminal？ 現在 PC 當道，基本上已經不存在過去那種「使用（不具運算能力的）終端連上一台電腦進行控制與運算」的情境。但是我們想把 TTY 這個概念延續到現在繼續用該怎麼辦？於是就出現了 Pseudo Terminal（注意：跟 Virtual Terminal 是不同的概念）。 關於他的定義，我們直接來看一下 pty 的 Linux man page ： A pseudoterminal (sometimes abbreviated \"pty\") is a pair of virtual character devices that provide a bidirectional communication channel. One end of the channel is called the master; the other end is called the slave. The slave end of the pseudoterminal provides an interface that behaves exactly like a classical terminal. A process that expects to be connected to a terminal, can open the slave end of a pseudoterminal and then be driven by a program that has opened the master end. Anything that is written on the master end is provided to the process on the slave end as though it was input typed on a terminal. Pseudo Terminal 建立了兩個虛擬字元裝置，分別稱為 master 與 slave，提供了一個雙向溝通的管道。讀寫 slave 端的的行程可以把該 slave 裝置完全當作是一個普通的 TTY 裝置軟體層，具有終端的行為模式。而另一個行程則能對 master 端進行讀寫，把 master 端當作是 TTY 裝置的硬體層。 而其中對 master 或 slave 端寫入的資訊，同樣會經過 line discipline 的處理，再進到另一端。 借 The TTY demystified 這篇文章中的圖來說明： 換句話說，就是 串列埠接頭變成了一個 file descriptor 。於是呢，像 xterm 之類的終端模擬器（Terminal Emulator）就能夠以程式的方式去模擬一台古早年代終端機，將使用者使用終端機對串列埠寫入及讀取的行為模式，改為 寫入及讀取這個 file descriptor ，在同一台機器上模擬終端的輸入及輸出。 大概了解了 Pseudo Terminal，接下來看看 Python 怎麼做這件事。 The pty module 一句話解釋完 pty 模組： starting another process and being able to write to and read from its controlling terminal programmatically. Bingo，這聽起來就是我想要的啊！其中我們會需要用到 pty.fork 這個函式： pty.fork() ：Fork 一個子行程，並讓該子行程的控制終端接上一個 Pseudo Terminal 的 slave 端。父行程會得到該 Pseudo Terminal 的 master 端，以一個 file descriptor 表示。這個函式的回傳值是個 tuple：(pid, fd)，子行程得到的 pid 會是 0，而父行程會得到一個非 0 的值，為子行程的 pid。 換句話說，我們可以啟動一個子行程，並使用父行程來控制該子行程的終端裝置，也就是 /dev/tty。在實做之前，先來測試一下 pty.fork() ： 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 import pty import time import os import sys pid , fd = pty . fork () if pid == 0 : # Child process while True : try : sys . stdout . write ( 'Hello World! \\n ' ) time . sleep ( 100 ) except KeyboardInterrupt : sys . stdout . write ( 'SIGINT Received! \\n ' ) sys . exit ( 1 ) else : print ( 'Parent wait for 1 sec then write 0x03...' ) time . sleep ( 1 ) print ( 'Parent write 0x03' ) os . write ( fd , b ' \\x03 ' ) # Read until EOF or Input/Output Error data = b '' while True : try : buf = os . read ( fd , 1024 ) except OSError : break else : if buf != b '' : data += buf else : break print ( 'Parent read from pty fd: {} ' . format ( repr ( data ))) print ( 'Parent wait for child process {!r} to exit...' . format ( pid )) pid , status = os . waitpid ( pid , 0 ) print ( 'Parent exit' ) 執行以上程式碼後應該會出現以下結果 (Ubuntu 16.04 with Python 3.5)： $ python3.5 pty_fork_test.py Parent wait for 1 sec then write 0x03... Parent write 0x03 Parent read from pty fd: b 'Hello World!\\r\\n&#94;CSIGINT Received!\\r\\n' Parent wait for child process 17676 to exit... Parent exit 這段程式碼展示了父行程如何使用 pty.fork() 回傳的 file descriptor 與子行程溝通的過程： 子行程的 stdout 連接到 slave 端，因此子行程對 stdout 寫入的內容可以被父行程透過讀取 master 端，也就是 pty.fork() 回傳的 file descriptor，來接收。因此，父行程能夠讀取到子行程對 stdout 寫入的 Hello World!\\n 字串。 子行程寫入的 Hello World\\n 到了父行程變成了 Hello World\\r\\n ，多了一個 Carriage Return \\r 字元，這是 Line discipline 正在作用的結果。這證明了中間並不是只有單純的資料交換，而是 Linux 的 TTY 系統在作動中。 父行程對 file descriptor 寫入數值 0x03 後，到了子行程變成了 SIGINT 信號而被 Python 捕捉為 KeyboardInterrupt 例外，接著子行程對 stdout 寫入 SIGINT Received!\\n 字串，然後被父行程讀取並顯示為 &#94;CSIGINT Received!\\r\\n 。這也證明了 Line discipline 以及 TTY 系統的作用。 以上是對 pty.fork() 做的簡單測試。接下來來實做啦！ The MP3 player powered by madplay 針對「使用 Python + madplay 控制 MP3 檔案的播放」這件事，可以這樣做： 使用 pty.fork() Fork 出一個子行程，讓該子行程使用 Python 的 os.exec* 系列函式來啟動 madplay 取代目前行程，並播放一個 MP3 檔案。 父行程利用 pty.fork() 取得的 file descriptor 來控制子行程的終端裝置，進而控制 madplay。 沒事得清清 file descriptor 的 receive buffer，避免讓子行程持續寫入而塞爆 buffer（這是我自己想的，實際上可能不用，但買個保險嘛）。 子行程的 madplay 播放完畢後必須通知父行程，這時父行程必須使用 os.wait 或 os.waitpid 來收拾子行程，否則會產生彊屍行程。 不囉嗦，直接上 code： 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 82 83 84 85 86 87 88 89 90 91 92 93 94 95 96 97 98 99 100 101 102 103 104 105 106 107 108 109 110 111 112 113 114 115 116 117 118 119 120 121 import logging import select import signal import pty import os logger = logging . getLogger ( __name__ ) class Error ( Exception ): \"\"\"Base error\"\"\" class ReadTimeout ( Error ): \"\"\"Polling timeout\"\"\" class PlayerState ( object ): \"\"\"The state of the player\"\"\" PLAY = 'play' PAUSE = 'pause' STOP = 'stop' class Mp3FilePlayer ( object ): def __init__ ( self , file_path ): self . file_path = file_path self . player_state = PlayerState . STOP self . child_tty_fd = None self . child_pid = None self . poller = select . poll () def _start_play ( self ): \"\"\"This method forks a child process and start exec 'madplay' to play the mp3 file. Since 'madplay' can ONLY be controlled by tty, we have to use pty.fork and use the return fd in the parent process (which connects the child's controlling terminal) to control the playback. \"\"\" # Register SIGCHLD to get notified when the child process terminated signal . signal ( signal . SIGCHLD , self . _sigchld_handler ) pid , fd = pty . fork () if pid == 0 : # Child process. Exec madplay os . execl ( '/usr/bin/madplay' , '--tty-control' , self . file_path ) else : # Parent process self . child_tty_fd = fd logger . debug ( 'Forked child TTY fd: {} ' . format ( self . child_tty_fd )) self . child_pid = pid logger . debug ( 'Forked child PID: {} ' . format ( self . child_pid )) self . _clear_tty () def _read_tty ( self , n , timeout = None ): \"\"\"Read the TTY fd by n bytes or raise ReadTimeout if reached specified timeout. The timeout value is in milliseconds. \"\"\" self . poller . register ( self . child_tty_fd , select . POLLIN ) events = self . poller . poll ( timeout ) self . poller . unregister ( self . child_tty_fd ) # Immediately after the polling if not events : raise ReadTimeout assert len ( events ) == 1 , 'Number of polled events != 1' fd , event = events [ 0 ] if event != select . POLLIN : raise Error ( 'Unexpected polled event: {} ' . format ( event )) else : data = os . read ( self . child_tty_fd , n ) return data def _clear_tty ( self ): \"\"\"Clearing the TTY fd. Preventing the receiving buffer to overflow.\"\"\" while True : # Keep reading until timeout, which means nothing more to read. try : self . _read_tty ( 1024 , timeout = 0 ) except ReadTimeout : return def _sigchld_handler ( self , signum , frame ): \"\"\"Handler function of SIGCHLD\"\"\" logger . info ( 'SIGCHLD signal received.' ) self . stop () def play ( self ): \"\"\"Start the playback or resume from pausing\"\"\" if self . player_state == PlayerState . STOP : self . _start_play () self . player_state = PlayerState . PLAY elif self . player_state == PlayerState . PAUSE : os . write ( self . child_tty_fd , 'p' ) self . _clear_tty () self . player_state = PlayerState . PLAY else : pass def pause ( self ): \"\"\"Pause the playback\"\"\" if self . player_state == PlayerState . PLAY : os . write ( self . child_tty_fd , 'p' ) self . _clear_tty () self . player_state = PlayerState . PAUSE else : pass def stop ( self ): \"\"\"Stop the playback. This will stop the child process.\"\"\" if self . player_state != PlayerState . STOP : # Unregister the signal (set to SIG_DFL) to prevent recusively calling stop() signal . signal ( signal . SIGCHLD , signal . SIG_DFL ) logger . debug ( 'Kill pid {} ' . format ( self . child_pid )) os . kill ( self . child_pid , signal . SIGTERM ) logger . debug ( 'Wait pid {} ' . format ( self . child_pid )) os . waitpid ( self . child_pid , 0 ) logger . debug ( 'Child process {} died.' . format ( self . child_pid )) self . player_state = PlayerState . STOP 這段程式碼定義了類別 Mp3FilePlayer 來控制播放。以下是幾個重點： Mp3FilePlayer 定義了 play ， pause 及 stop 這三個方法來控制 MP3 檔案的播放、暫停及停止。 stop 方法會藉由送出 SIGTERM 信號來停掉子行程，並使用 waitpid() 來收拾善後。 使用 select.poll() ，而非直接使用 os.read() 直接讀取 file descriptor。原因是我需要對讀取這件事設定 timeout，而 os.read() 這個函式無法做到。 設定 Mp3FilePlayer._sigchld_handler 方法當 SIGCHLD 信號的處理函式，以便在 madplay 播放完 MP3 檔後，讓父行程呼叫 stop 方法來收拾子行程，避免產生彊屍行程。 Mp3FilePlayer 可以這樣使用： >>> from mp3_player import Mp3FilePlayer >>> p = Mp3FilePlayer ( '/tmp/test.mp3' ) >>> p . play () # The music should be started. The play method return immediately. >>> p . pause () # The music should be paused now. The pause method also return # immediately. >>> p . play () # The playback should be resumed from where it was paused. >>> p . stop () # The music should be stopped now. >>> p . play () # The music should be started from the beginning. Conclusion 經過這幾天的研究總算稍微理解了 TTY 這東西，也理解了如何使用 Python 的 pty 模組來控制其他行程的終端。希望這篇文能幫助大家🎉 References The TTY demystified What are the responsibilities of each Pseudo-Terminal (PTY) component (software, master side, slave side)? 一千零一夜之 Console I/O Linux TTY Driver — Linux TTY 驅動程式 What typing &#94;D really does on Unix Linux TTY framework(1)_ 基本概念 Linux TTY framework(3)_ 从应用的角度看 TTY 设备","tags":"Python","url":"https://johnliu55.tw/use-python-to-control-other-process-tty.html","loc":"https://johnliu55.tw/use-python-to-control-other-process-tty.html"}]};
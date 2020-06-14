###########################
為何需要 Async/await 語法？
###########################

:date: 2020-06-14
:category: Programming Language
:tags: Asynchronous Programming, JavaScript, Async/await, 閒聊
:summary: 在非同步程式設計（Asynchronous Programming）的領域裡，
          為何需要要 Async/await 語法？

近年來有許多語言都加入了Async/await這個語法來幫助開發者撰寫非同步程式碼，
其中不乏像JavaScript與Python等熱門語言，和 `Rust <Rust-async-await-stable_>`_
這樣的靜態形別語言。這邊就記錄一下我自己對它的看法。

**********************
為何需要async與await？
**********************

我認為，使用async與await來寫非同步的程式碼，
最大的好處在於 **你可以用同步程式設計的邏輯架構來實作非同步的邏輯** 。

譬如，今天你想使用某個作者的 ``User ID`` 取得他寫的 **最新文章** 上
的 **最新評論** ，然後拿它來做某件事。以同步的架構來寫的話，
你可能會這樣子發送HTTP請求：

.. code-block:: javascript

    function doStuff(user_id) {
        try {
            let user = syncHttpGet('/api/users/' + user_id);
            let post = syncHttpGet('/api/posts/' + user.posts[0].id);
            let comment = syncHttpGet('/api/comments/' + post.comments[0].id);
            doSomethingToComment(comment);
        } catch (e) {
            setGetCommentError(e);
        }
    }


這樣的好處是：

1. 邏輯簡單明瞭，一眼就可以看出做了哪些事
2. 可以直接利用語言本身的錯誤處理機制（try-catch）

不過在單執行緒的情況下，同步執行最大問題在於每一個 ``syncHttpGet`` 都會阻
擋系統處理其他事情的能力，以前端來說，這會造成在等待每個HTTP回覆的時候，
**整個UI會被凍結，完全無法處理使用者的其他操作** 。

因此，在前端的世界，這種需要等待回覆的操作通常都會實作為 **接收函式為引數** 的
函式，讓你能夠設定得到回覆後的行為。這樣一來，JavaScript就能夠使用非同步
的方式來執行這個操作，因為得到回覆的時候只要執行你給的函式就行了。

這個被傳進去的函式就稱為「回呼函式」（Callback Function）。
用這個概念來實做同樣的邏輯大概會長這樣：

.. code-block:: javascript

    function doStuff(user_id) {
        callbackHttpGet('/api/users/' + user_id, function (resp) {
            if (resp.statusCode === 200) {
                callbackHttpGet('/api/posts/' + resp.data.posts[0].id, function (resp) {
                    if (resp.statusCode === 200) {
                        callbackHttpGet('/api/comments/' + resp.data.comments[0].id, function (resp) {
                            if (resp.statusCode === 200) {
                                let comment = resp.data;
                                doSomethingToComment(comment);
                            } else {
                                setGetCommentError('Cannot get comment detail');
                            }
                        })
                    } else {
                        setGetCommentError('Cannot get post');
                    }
                })
            } else {
                setGetCommentError('Cannot get user');
            }
        })
    }


**然後，你就進入回呼地獄（Callback Hell）** 了：
因為必須在得到回覆後 **用裡面的資料再次進行非同步操作** ，
於是就出現了在回呼中再次使用回呼的模式。對，它會動，但很傷眼…

1. 層層套疊的金字塔狀程式碼，很難一眼看出內部邏輯
2. 不斷重覆出現的 ``if..else`` 錯誤處理邏輯。另外，如果我只在乎最後的
   ``comment`` ，中間的每個 ``setGetCommentError`` 都是多餘的程式碼。

相信很多人都深受其害，迷失在這個地獄所帶來的Bugs…
幸好 `ES6`_ 推出了 `Promise`_ 這個結構來擺脫回呼地獄，讓你可以用
`Method chaining`_ 的方式來串連這些HTTP請求，而不是一層包一層的模式：

.. code-block:: javascript

    function doStuff(user_id) {
        asyncPromiseGet('/api/users/' + user_id)
            .then(function (resp) {
                return asyncPromiseGet('/api/posts/' + resp.data.posts[0].id);
            })
            .then(function (resp) {
                return asyncPromiseGet('/api/comments/' + resp.data.comments[0].id);
            })
            .then(function (resp) {
                let comment = resp.data;
                doSomethingToComment(comment);
            })
            .catch(function (err) {
                setGetCommentError(err);
            })
    }


``asyncPromiseGet`` 函式會回傳一個Promise物件，
上面有一個 ``then()`` 方法接收一個回呼函式為引數，
並在得到HTTP回覆時呼叫這個函式。同時 ``then()`` 方法也會 **回傳一個新的
Promise物件** ，讓你可以一直 ``.then()`` 下去。

Promise真正厲害的地方在於，如果你給的回呼函式也回傳了Promise物件，
那麼這個Promise最後得到的值， **會被送到** ``then()``
**所回傳的那個新的Promise上** ，讓下一個串起來的 ``then()``
能夠取得你的回呼函式想要得到的結果。
就是因為這個原因，我們才能夠使用Method chaining而不是巢狀的方式來串連這些HTTP
請求。

.. note::

    其實 ``then()`` 方法可以接收兩個函式引數，
    這邊為了簡單起見只說明傳一個的情況，細節請看 `Using Promises`_。

Promise 讓金字塔消失了，而且也簡化了錯誤處理的機制，可以看到我只要最後加個
``.catch()`` 就能夠統一處理錯誤。然而，這還是逃不了回呼的概念，與
同步版本相較之下還是沒那麼優雅。

於是乎，最後就出現了async與await：

.. code-block:: javascript

    async function doStuff(user_id) {
        try {
            let user = await asyncHttpGet('/api/users/' + user_id);
            let post = await asyncHttpGet('/api/posts/' + user.posts[0].id);
            let comment = await asyncHttpGet('/api/comments/' + post.comments[0].id);
            doSomethingToComment(comment);
        } catch (e) {
            setGetCommentError(e);
        }
    }


可以看到，除了出現 ``await`` 跟 ``async`` 這幾個字以外，基本上程式碼的架構
與同步版的一模模一樣樣，也可以用語言原生的 ``try catch`` 機制來進行錯誤處理，
超讚的啦！

值得注意的是，async/await看起來是全新的概念， 但其實這兩個語法
是 `由Promise和生成器（Generator） <async-await-native-implementation_>`_
來實作的。你可以試著在Node.js裡定義一個async函式並直接呼叫它：

.. code-block:: javascript

    > async function f() { return 1; }
    undefined
    > f()
    Promise { 1 }


可以看到async函式回傳的其實是Promise。對背後實作有興趣可以去Google一下，
或是去翻一下 `忍者：JavaScript 開發技巧探秘 第二版`_ 這本書的第六章，
裡面有很詳細的解釋。

**********
References
**********

- `忍者：JavaScript 開發技巧探秘 第二版`_

- `Using Promises`_ - MDN

- `Async/Await`_ - JAVASCRIPT.INFO


.. _Rust-async-await-stable: https://blog.rust-lang.org/2019/11/07/Async-await-stable.html

.. _ES6: https://en.wikipedia.org/wiki/ECMAScript#6th_Edition_%E2%80%93_ECMAScript_2015

.. _Promise: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

.. _Using Promises: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises

.. _Method chaining: https://en.wikipedia.org/wiki/Method_chaining

.. _Async/Await: https://javascript.info/async-await

.. _async-await-native-implementation: https://stackoverflow.com/questions/46908575/async-await-native-implementations

.. _忍者：JavaScript 開發技巧探秘 第二版: https://www.tenlong.com.tw/products/9789864342525

#####################
用 Pelican 寫中文文章
#####################

:date: 2019-05-19
:category: Python
:tags: Python, Pelican

想寫Blog很久了，一直覺得該找個地方記錄一下腦子裡的想法，不然我記性超級差，
隔天就忘了自己到底在忙什麼。

那要用什麼寫？

一般的Blog服務當然是不考慮，對 **時常要放程式碼** 的人來說完全不適合。

在很潮的Medium上寫過一篇文章，沒有原生支援Code Syntax Highlighting
讓人非常消火，每次都得用GitHub Gist放程式碼實在有點麻煩。
而且用Vim + Markup Language寫文件寫習慣了，對必須用滑鼠改格式這件事覺得
不太順手。

Google了一下，身為Python工程師及愛好者，用 `Pelican`_ 寫然後架在GitHub Pages
上似乎是最好的選擇：

- 用Python寫的，可以用Python擴充和修改功能
- 支援reStructuredText及Markdown
- 支援Disqus和Google Analytic等其他好用的服務
- 支援許多主題： `Pelican Themes`_

讚，那就開始寫吧！

----

*****************
當Pelican遇上中文
*****************

平常文件都是用英文在寫，當開始用reStructuredText寫起中文立刻覺得不太對勁…好像出現了很多
不該出現的空格？

.. figure:: {static}images/weird-spaces.png
   :alt: 詭異的空格們

   詭異的空格們

換行變成了空格
==============

我是龜毛人，原始碼的行數不超過80個字元是基本，最多也不能超過100，
所以很長的一個段落會用多行表示：

.. code-block:: python

   我是龜毛人，原始碼的行數不超過80個字元是基本，最多也不能超過100，
   所以很長的一個段落會用多行表示：

reStructuredText和Markdown都會保留這個換行字元到轉換後的HTML中：

.. code-block:: python

   <p>我是龜毛人，原始碼的行數不超過80個字元是基本，最多也不能超過100，
   所以很長的一個段落會用多行表示：</p>

而瀏覽器在遇到這樣的換行字元時會將他轉換為空格，因為
`Spec <https://www.w3.org/MarkUp/html-spec/html-spec_4.html#SEC4.2.2>`_
就是這樣規定：

   An HTML user agent should treat end of line in any of its variations as
   a word space in all contexts except preformatted text.

這件事在英文很合理，但到了中文就不合理了， **因為我們不會用空格把文字隔開** 。
於是乎，上面的例子瀏覽器會顯示為：

   我是龜毛人，原始檔的行數不超過80個字元是基本，100則是最大值， 所以很長的一個段落會用多行表示：

注意到「所以」前面多了一個空格。如果你習慣很好，只有在使用標點符號之後才會
換行，那看起來影響不大。但如果換行是介於兩個中文字之間，
那就會 像這樣在文字間出現詭異的空格。

Inline Markup的空格
===================

不像Markdown，reStructuredText要求 **必須用空格**
（ `或其他類似功能的字元 <http://docutils.sourceforge.net/docs/ref/rst/restructuredtext.html#inline-markup-recognition-rules>`_ ）
將Inline Markup
與其他的文字區隔開來：

.. code-block:: general

   This is **inline markup** bold.

這樣的空格會被保留到HTML：

.. code-block:: HTML

   <p>This is <strong>inline markup</strong> bold.</p>

跟上面提到的一樣，這空格在英文沒差，中文就不行了。不過江湖在走，Workaround要有，
最簡單的方法是自己用 ``\`` 來「跳脫」這個空格：

.. code-block:: general

   This is\ **inline markup**\ bold.

但每次都要手動加入這反斜線實在有點麻煩。如果這空格能自己消失，那該有多好。

Bonus：中英文間的空格
=====================

   有研究顯示，打字的時候不喜歡在中文和英文之間加空格的人，感情路都走得很辛苦，
   有七成的比例會在34歲的時候跟自己不愛的人結婚，
   而其餘三成的人最後只能把遺產留給自己的貓。畢竟愛情跟書寫都需要適時地留白。
   —— `vinta/pangu.js <https://github.com/vinta/pangu.js>`_

…這種空格我個人是覺得還可以接受啦，不過如果Pelican能自動幫我加上這些空格，
那我就不用擔心未來會跟不愛的人結婚了。寫程式真是份偉大的工作。

**********************
寫個Pelican Plugin吧！
**********************

原本想說可以從處理reStructuredText的函式庫 `docutils`_ 下手，
無奈功力不夠高深，看不出來到底該怎麼修改他的行為，只好從Pelican下手。

之前提到Pelican能夠用Python自己擴充功能，而在官方的 `pelican-plugins`_
列表中搜尋了一下只有 `cjk-auto-spacing`_ 能夠自動調整中英文間的空格，
但還是沒有解決所有的問題。Google了一下找到這篇
「 `解决 jekyll 中文换行变成空格的问题`_ 」，但他是用
`Jekyll <https://jekyllrb.com/>`_ 而不是Pelican。安捏…不如自己寫一個吧！

Pelican Plugin的運作方式
========================

   Pelican定義了各種「 **信號** 」（Signal），
   代表了從原始碼到最後生出HTML的各個 **階段** 。
   你可以將自己寫的Python函式 **註冊** 到這些信號上，
   Pelican就會在那些 **信號對應的階段發生時** 呼叫你的函式，
   並將當下的狀態或處理的物件傳進這個函式，讓你的函式能夠調整Pelican的行為。
   細節和信號列表請參考 `Pelican Plugin Document`_ 。

前面提到了 `cjk-auto-spacing`_ ，理所當然拿他來參考一下。它處理的方式是使用信號
*content_object_init* 來取得 ``content_object`` 物件，而這個物件的 ``_content``
屬性存放了從reStructuredText及Markdown原始碼轉換而來的 **HTML** ，以 ``str``
儲存。我們可以根據需求來調整這個HTML，調整完後再assign回 ``_content`` ，
Pelican就會用這份新的HTML繼續之後的工作。

舉例來說，如果我們想把HTML裡的所有 ``<p>`` Tag換成 ``<foo>`` ，可以很快的用
Regular Expression來達成：

.. code-block:: python

   import re

   from pelican import signals


   def process(content):
       new_content = re.sub(r'<(/)?p>', r'<\1foo>', content._content)
       content._content = new_content


   def register():
       signals.content_object_init.connect(process)

Pelican規定每個Plugin都必須要有 ``register`` 函式，
目的在指定你需要哪些信號以及他們要觸發的函式。

***********
Pelican-CJK
***********

花了些時間用Regular Expression刻了一個能夠自動處理以上問題的Plugin：
`pelican-cjk`_ 。它能夠自動根據你寫的內容調整HTML，解決上述那些小毛病。

在開發這個Plugin的時候考慮了以下幾點：

- 必須支援reStructuredText及Markdown

- 不想依賴其他第三方模組

如果要從原始碼（ ``.md`` 與 ``.rst`` ）或Parser下手，
就還得考慮reStructuredText和Markdown的差異，所以如果兩個都得支援，
直接從HTML下手會好處理很多。

而基於第二點，
`Beautiful Soup <https://www.crummy.com/software/BeautifulSoup/bs4/doc/>`_
等等能夠幫助處理HTML的模組也就不考慮了，而Python內建的
`HTML Parser <https://docs.python.org/3/library/html.parser.html>`_ 又太陽春，
所以最後我直接用Regex來處理。但這不免有些小問題：

- 無法判斷目前要調整的文字屬於那種區塊。reStructuredText和Markdown都有所謂的
  「Literal Block」，在這個區塊內是不會處理任何標記的。
  **但因為程式無法根據HTML判斷區塊，它一樣會調整這個區塊內的文字。**
  不過Literal Block通常是用來放範例程式碼的，比較不會出現中英混用的情況，
  所以就我認為影響不大。

- 透過上述信號拿到的HTML **不包含文章的標題** ，所以標題無法調整，
  得自己加入中英文間的空格。這應該可以透過其他信號取得，但我還沒研究。

- 為了簡單起見，我寫的Regex不會針對以下情況調整空格：

  * 巢狀Inline Markup：reStructuredText不允許這種情況，也就是說HTML中不會出現
    ``English<em><strong>斜體又粗體</strong></em>`` 這樣的東西。
    但Markdown允許，所以這是有機會出現的。以這個例子來說，
    「English」與「斜體又粗體」間就不會自動加空格。

  * 連續Inline Markup： ``<em>English</em><strong>很強</strong>``
    連續的兩個Inline Markup也需要額外判斷，而且使用情況也不多，
    所以在此也不考慮。

希望這個Plugin能夠幫助更多跟我一樣毛很多的人，
如果大家有什麼更好的方法也歡迎一起討論。

**********
References
**********

- `vinta/pangu.js <https://github.com/vinta/pangu.js>`_

- `解决 jekyll 中文换行变成空格的问题`_

.. _解决 jekyll 中文换行变成空格的问题: jekyll_cjk_newline
.. _docutils: http://docutils.sourceforge.net/
.. _Pelican: https://docs.getpelican.com/en/stable/
.. _Pelican Themes: http://www.pelicanthemes.com/
.. _pelican-plugins: https://github.com/getpelican/pelican-plugins
.. _Pelican Plugin Document: https://docs.getpelican.com/en/stable/plugins.html
.. _cjk-auto-spacing: https://github.com/yuex/cjk-auto-spacing
.. _jekyll_cjk_newline: http://blog.guorongfei.com/2015/04/25/how-to-fix-the-markdown-newline-blank-problem/
.. _pelican-cjk: https://github.com/johnliu55tw/pelican-cjk

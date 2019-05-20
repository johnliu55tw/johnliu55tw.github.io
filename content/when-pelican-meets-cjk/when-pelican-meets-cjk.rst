用 Pelican 寫中文文章
###################

:date: 2019-05-19
:category: Python
:tags: Python, Pelican

我很愛講話，愛講到同事曾經問我要不要當Youtuber，他會找人幫我宣傳（不豪洨）

Hmm，這樣的話應該先開個部落格寫寫文章吧？

那要用啥寫？Medium很潮，不過沒有原生支援Syntax Highlighting讓人非常消火，
而且Markup language寫習慣了，對要用滑鼠改格式這件事情感到相當疲勞。

身為Python工程師及愛好者， `Pelican`_ 無非是最好的選擇：

- 用Python寫的
- 支援reStructuredText及Markdown
- 支援Disqus和Google Analytic等其他好用的服務
- 支援許多主題： `Pelican Themes`_

讚，那就開始寫吧！

----

當Pelican遇上中文
*****************

平常都是用英文寫reStructuredText和Markdown，
當開始用reStructuredText寫中文文章後立刻覺得不舒服了起來：

換行變成了空格
==============

我是龜毛人，原始碼的行數不超過80個字元是基本，最多也不能超過100，
所以一個段落會用多行表示：

.. code-block:: python

   我是龜毛人，原始碼的行數不超過80個字元是基本，最多也不能超過100，
   所以一個段落會用多行表示：

reStructuredText（Markdown也是一樣）會保留這個換行字元到轉換後的HTML中：

.. code-block:: python

   <p>我是龜毛人，原始碼的行數不超過80個字元是基本，最多也不能超過100，
   所以一個段落會用多行表示：</p>

Browser在遇到這類的換行字元時會將他轉換為空格，因為
`Spec <https://www.w3.org/MarkUp/html-spec/html-spec_4.html#SEC4.2.2>`_
就是這樣規定：

   An HTML user agent should treat end of line in any of its variations as
   a word space in all contexts except preformatted text.

這件事在英文很合理，但到了中文就不合理了，因為我們不會用空格把文字隔開。
於是乎，上面的例子在Browser顯示出來會變成：

   我是龜毛人，原始檔的行數不超過80個字元是基本，100則是最大值， 所以一個段落會用多行表示：

注意到「所以」前面多了一個空格。嘿對，我就是覺得有差，看起來心情就是不好。
所以我要把他處理掉。

中英文間的空格
==============

   有研究顯示，打字的時候不喜歡在中文和英文之間加空格的人，感情路都走得很辛苦，
   有七成的比例會在34歲的時候跟自己不愛的人結婚，
   而其餘三成的人最後只能把遺產留給自己的貓。畢竟愛情跟書寫都需要適時地留白。
   —— `vinta/pangu.js <https://github.com/vinta/pangu.js>`_

…但打字的時候就是會懶惰嘛，有時候也不小心會忘記，如果能在輸出成HTML的時候
自動幫我加上去，那我就不用擔心跟不愛的人結婚了（咦？）

Inline Markup的空格
===================

不像Markdown，reStructuredText要求一定得用空格或其他符號字元將Inline Markup
與其他的文字區隔開來。

但這樣的空格會被保留到HTML，讓相鄰的中文字元間產生莫名奇妙的空格。
不過江湖在走，Workaround要有，最快的方法是自己用 ``\`` 跳脫字元來處理這個空格。

但每次都要手動加入這反斜線實在有點麻煩。如果這空格能自己消失，那就很舒服了。

References
**********

- `vinta/pangu.js <https://github.com/vinta/pangu.js>`_

- `解决 jekyll 中文换行变成空格的问题
  <http://blog.guorongfei.com/2015/04/25/how-to-fix-the-markdown-newline-blank-problem/>`_

.. _Pelican: https://docs.getpelican.com/en/stable/
.. _Pelican Themes: http://www.pelicanthemes.com/

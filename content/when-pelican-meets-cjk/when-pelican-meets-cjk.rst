用Pelican寫中文文章
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

我是龜毛人，原始檔的行數不超過80個字元是基本，100則是最大值，
所以一個段落會用多行表示：

.. code-block:: python

   我是龜毛人，原始檔的行數不超過80個字元是基本，100則是最大值，
   所以一個段落會用多行表示：

reStructuredText（Markdown也是一樣）會保留這個換行字元到轉換後的HTML中：

.. code-block:: python

   <p>我是龜毛人，原始檔的行數不超過80個字元是基本，100則是最大值，
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

.. _Pelican: https://docs.getpelican.com/en/stable/
.. _Pelican Themes: http://www.pelicanthemes.com/

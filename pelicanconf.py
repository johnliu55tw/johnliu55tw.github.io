#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals
import sys

# For plugins
sys.path.append('./plugins/')
PLUGINS = ['cjk_auto_spacing', 'cjk_remove_newline']

THEME = 'elegant'
AUTHOR = 'John Liu'
SITENAME = 'John Engineering Stuff'
SITEURL = 'http://localhost:8000'  # Dev settings

SLUGIFY_SOURCE = 'basename'

PATH = 'content'

TIMEZONE = 'Asia/Taipei'

DEFAULT_LANG = 'zh-tw'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Blogroll
LINKS = (('Pelican', 'http://getpelican.com/'),
         ('Python.org', 'http://python.org/'),
         ('Jinja2', 'http://jinja.pocoo.org/'),
         ('You can modify those links in your config file', '#'),)

# Social widget
SOCIAL = (('Github', 'https://github.com/johnliu55tw'),
          ('LinkedIn', 'https://www.linkedin.com/in/johnliu55tw/'),)

DEFAULT_PAGINATION = 10

# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True

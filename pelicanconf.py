#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

PLUGIN_PATHS = ['./plugins', './pelican-plugins']

THEME = 'themes/elegant'
AUTHOR = 'John Liu'
SITENAME = 'John Engineering Stuff'
SITEURL = 'http://localhost:8000'  # Dev settings

SLUGIFY_SOURCE = 'basename'

PATH = 'content'

TIMEZONE = 'Asia/Taipei'

DEFAULT_LANG = 'zh-tw'

# Elegant Theme
# https://pelican-elegant.github.io/configuration-variables-and-metadata-list
TAG_SAVE_AS = ''
AUTHOR_SAVE_AS = ''
CATEGORY_SAVE_AS = ''
STATIC_PATHS = ['theme/images', 'images']
PLUGINS = ['pelican_cjk', 'sitemap', 'tipue_search', 'neighbors', 'share_post']
DIRECT_TEMPLATES = ('index', 'tags', 'categories', 'archives', 'search', '404')
SITEMAP = {'format': 'xml'}

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

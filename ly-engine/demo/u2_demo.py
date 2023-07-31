#! /usr/bin/env python
# -*- coding: utf-8 -*-
"""
@Author: Luo Yuqi
@File: u2_demo
@Created: 2023/7/12 14:43
"""
import uiautomator2 as u2
from lyium.u2 import Page, Element


class BBSPage(Page):
    search_input = Element(text="Settings", describe="搜索输入框")


d = u2.connect()

page = BBSPage(d)

page.search_input.screenshots()
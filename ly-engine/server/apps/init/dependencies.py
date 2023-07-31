#! /usr/bin/env python
# -*- coding: utf-8 -*-
"""
@Author: Luo Yuqi
@File: dependencies
@Created: 2023/7/13 17:46
"""
from fastapi import Request

from utils.local import g


async def set_global_request(request: Request):
    """设置全局request 便与上下文的访问"""
    g.request = request

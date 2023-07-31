#! /usr/bin/env python
# -*- coding: utf-8 -*-
"""
@Author: Luo Yuqi
@File: routers
@Created: 2023/7/13 17:53
"""
from fastapi import FastAPI

from server.apps.apis.api_router import app_router


def init_router(app: FastAPI):
    """ 注册路由 """
    # 权限(权限在每个接口上)
    app.include_router(app_router)
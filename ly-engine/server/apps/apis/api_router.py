#! /usr/bin/env python
# -*- coding: utf-8 -*-
"""
@Author: Luo Yuqi
@File: api_router
@Created: 2023/7/13 13:51
"""
from fastapi import APIRouter

from server.apps.apis import task, repo

app_router = APIRouter()

app_router.include_router(task.router, prefix="/task", tags=["task"])
app_router.include_router(repo.router, prefix="/repo", tags=["repo"])

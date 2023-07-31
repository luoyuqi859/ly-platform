#! /usr/bin/env python
# -*- coding: utf-8 -*-
"""
@Author: Luo Yuqi
@File: main
@Created: 2023/7/13 13:44
"""
import uvicorn
from fastapi import FastAPI, Depends

from conf.config import Config
from server.apps.init.cors import init_cors
from server.apps.init.dependencies import set_global_request

app = FastAPI(title="pyrunner",
              description=Config.PROJECT_DESC,
              version=Config.PROJECT_VERSION,
              dependencies=[Depends(set_global_request)])


async def init_app():
    """ 注册中心 """
    init_mount(app)  # 挂载静态文件

    init_exception(app)  # 注册捕获全局异常

    init_router(app)  # 注册路由

    init_middleware(app)  # 注册请求响应拦截

    init_cors(app)  # 初始化跨域


@app.on_event("startup")
async def startup():
    await init_app()  # 加载注册中心


if __name__ == '__main__':
    uvicorn.run("main:app", host=Config.SERVER_HOST, port=Config.SERVER_PORT, reload=False, forwarded_allow_ips="*")

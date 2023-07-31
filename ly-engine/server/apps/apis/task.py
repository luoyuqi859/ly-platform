#! /usr/bin/env python
# -*- coding: utf-8 -*-
"""
@Author: Luo Yuqi
@File: task
@Created: 2023/7/13 14:32
"""
import asyncio
import json
import re
import sys
from typing import List

from fastapi import APIRouter
from loguru import logger
from pydantic import BaseModel
from starlette.websockets import WebSocket

from conf.config import ROOT
from utils.yaml_fun import GetYamlData

router = APIRouter()


class Item(BaseModel):
    args: List[str] = []


@router.post("/create")
async def create_tasks(item: Item):
    args = item.args
    GetYamlData(f"{ROOT / 'conf' / 'config.yaml'}").write_yaml_data("pytest", args)
    return {"message": "PyAuto tasks create successful"}


def remove_color_codes(s: str) -> str:
    """
    Remove ANSI color codes from a string.
    """
    return re.sub(r'\x1B(?:[@-Z\\-_]|\[[0-?]*[ -/]*[@-~])', '', s)


async def run_background_task(websocket: WebSocket) -> None:
    try:
        data = await websocket.receive_text()
        if isinstance(data, bytes):
            data = data.decode()
        json_msg = json.loads(data)
        serial = json_msg.get('serial')
        if not serial:
            await websocket.send_json({'message': 'need serial'})
            return

        # 获取包含 run.py 脚本的目录
        script_dir = ROOT / "cmd"
        logger.info(serial)

        # 将当前工作目录设置为脚本目录
        # os.chdir(script_dir)
        # 启动子进程并取得其进程对象
        run_process = await asyncio.create_subprocess_exec(
            sys.executable, 'run.py', '-s', f'{serial}',
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.STDOUT,
            cwd=str(script_dir))

        # 读取子进程输出并发送到 WebSocket
        async for line in run_process.stdout:
            message = line.decode().strip()
            if message:
                await websocket.send_json({'message': remove_color_codes(message)})

        # 等待子进程退出
        rc = await run_process.wait()

        # 发送消息给客户端表示任务已完成
        await websocket.send_json({'message': f'Task completed with return code {rc}'})

    except Exception as e:
        # 如果发生异常，则将跟踪信息打印到输出缓冲区
        import traceback
        traceback.print_exc(file=sys.stdout)

    finally:
        # 关闭 WebSocket 连接
        await websocket.send_json({'message': 'task_finished'})
        await websocket.close()


@router.websocket("/ws")
async def run_task(websocket: WebSocket):
    await websocket.accept()
    task = asyncio.create_task(run_background_task(websocket))
    await task

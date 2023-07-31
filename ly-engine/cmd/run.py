#! /usr/bin/env python
# -*- coding: utf-8 -*-
"""
@Author: Luo Yuqi
@File: run.py
@Created: 2023/7/12 15:27
"""
import asyncio
import shutil
import time
import psutil

from loguru import logger

from conf.config import Config, ROOT
from utils.allure.collect import AllureDataCollect
from utils.excel_fun import ErrorCaseExcel
from utils.models.model import NotificationType
from utils.notify_fun import FeiShuTalkChatBot
from utils.pytest_helper.run_pytest import run_py


class PyAutoRun:

    @staticmethod
    async def env_file_move():
        shutil.copy(src=ROOT / "cmd" / "categories.json", dst=f'{Config.report_path / "tmp"}')
        shutil.copy(src=ROOT / "cmd" / "environment.properties", dst=f'{Config.report_path / "tmp"}')
        shutil.copy(src=ROOT / "cmd" / "executor.json", dst=f'{Config.report_path / "tmp"}')
        shutil.copy(src=ROOT / "cmd" / "openReport.bat", dst=Config.report_path)

    @staticmethod
    async def excel_report() -> None:
        if Config.yaml_data.excel_report:
            ErrorCaseExcel(Config.report_path).write_case()

    @staticmethod
    async def notify() -> None:
        allure_data = AllureDataCollect(Config.report_path)
        data = allure_data.get_case_count()
        notification_mapping = {
            NotificationType.FEI_SHU.value: FeiShuTalkChatBot(data).post
        }
        if Config.yaml_data.notification_type != NotificationType.DEFAULT.value:
            notification_mapping.get(Config.yaml_data.notification_type)()

    @staticmethod
    async def main():
        logger.info(f"开始执行{Config.yaml_data.project_name}项目... 佛祖保佑       全部跑过")
        start_time = time.time()
        await run_py()
        tasks = [
            asyncio.create_task(PyAutoRun.env_file_move()),
            asyncio.create_task(PyAutoRun.excel_report()),
            asyncio.create_task(PyAutoRun.notify())
        ]
        await asyncio.gather(*tasks, return_exceptions=True)
        end_time = time.time()
        logger.info(f"Execution time: {end_time - start_time}")
        # 杀掉占用端口9999的进程
        for proc in psutil.process_iter():
            try:
                connections = proc.connections()
                for conn in connections:
                    if conn.laddr.port == 9999:
                        proc.kill()
            except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess):
                pass
        # # 启动子进程自动打开报告
        cmd = f'{Config.allure_bat} open {Config.report_path / "html"} -p 9999'
        await asyncio.create_subprocess_shell(cmd)

    @staticmethod
    def startup() -> None:
        try:
            asyncio.run(PyAutoRun.main())
        except KeyboardInterrupt:
            logger.info("Interrupt catched")


if __name__ == '__main__':
    PyAutoRun.startup()

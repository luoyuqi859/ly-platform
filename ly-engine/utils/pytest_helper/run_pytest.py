#! /usr/bin/env python
# -*- coding: utf-8 -*-
"""
@Author: Luo Yuqi
@File: run_pytest
@Created: 2023/7/13 10:58
"""
import asyncio

import pytest

from conf.config import Config
from utils.common import execute_command
from utils.pytest_helper.common import CommonPlugin


async def run_py(*args):
    """
    执行测试用例
    :param test_path: test_*.py测试文件路径
    :param allure_dir: allure 报告路径
    :param report_url: 报告路由
    :param case_name: 用例名称
    :return:
    """
    pytest_args = [f'--alluredir={Config.report_path / "tmp"}', "--clean-alluredir"]
    pytest_args.extend(Config.yaml_data.pytest)
    pytest.main(pytest_args, plugins=[CommonPlugin()])
    execute_command(
        f'{Config.allure_bat} generate {Config.report_path / "tmp"} -o {Config.report_path / "html"} --clean',
        timeout=30)

    # await asyncio.create_subprocess_shell(f'{Config.allure_bat} open {Config.report_path / "html"} -p 9999')
    # cmd = f'{Config.allure_bat} open {Config.report_path / "html"} -p 9999'
    # execute_command(cmd, timeout=30)
    # await asyncio.create_subprocess_shell(cmd)
    # time.sleep(1)
if __name__ == '__main__':
    asyncio.run(run_py())

#! /usr/bin/env python
# -*- coding: utf-8 -*-
"""
@Author: Luo Yuqi
@File: config
@Created: 2023/7/12 15:02
"""
import os
from pathlib import Path

import typing
from pydantic import BaseSettings

from utils.common import get_host_ip, get_free_port
from utils.models.model import YamlData
from utils.time_fun import time_manager
from utils.yaml_fun import GetYamlData

ROOT = Path(__file__).parent.parent

__version__ = "2.1.0"

project_desc = """
    🎉 pyrunner 管理员接口汇总 🎉
"""


class BaseConfig(BaseSettings):
    # allure
    allure_bat = ROOT / 'utils' / 'allure' / "libs" / "bin" / "allure"
    yaml_data: YamlData = YamlData(**GetYamlData(f"{ROOT / 'conf' / 'config.yaml'}").get_yaml_data())
    current_time = time_manager.strftime_now("%Y-%m-%d-%H-%M-%S")
    report_path = ROOT / "report" / yaml_data.project_name / current_time

    CORS_ORIGINS: typing.List[typing.Any] = ["*"]  # 跨域请求

    localhost_ip = get_host_ip()
    localhost_port = get_free_port()

    SERVER_HOST: str = "0.0.0.0"
    SERVER_PORT: int = 5555


Config = BaseConfig()

if __name__ == '__main__':
    print(Config.yaml_data.notification_type)

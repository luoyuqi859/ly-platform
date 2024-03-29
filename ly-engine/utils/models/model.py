#! /usr/bin/env python
# -*- coding: utf-8 -*-
"""
@Author: Luo Yuqi
@File: model
@Created: 2023/7/12 15:10
"""

from dataclasses import dataclass
from enum import Enum
from typing import Text, Union, List

from pydantic import BaseModel


class Webhook(BaseModel):
    webhook: Union[Text, None]


class Pref(BaseModel):
    switch: bool
    package: Union[Text, None]
    frequency: int


class Host(BaseModel):
    remote: bool
    name: Text
    category: Text
    address: Text
    username: Text
    password: Text


class NotificationType(Enum):
    """ 自动化通知方式 """
    DEFAULT = 0
    FEI_SHU = 1
    WECHAT = 2
    EMAIL = 3
    DING_TALK = 4


class YamlData(BaseModel):
    project_name: Text
    tester_name: Text
    lark: "Webhook"
    notification_type: int = 0
    excel_report: bool
    perf: "Pref"
    pytest: List
    concurrent: bool
    host: "Host"


@dataclass
class TestMetrics:
    """ 用例执行数据 """
    passed: int
    failed: int
    broken: int
    skipped: int
    total: int
    pass_rate: float
    start_time: Text
    stop_time: Text
    duration: Text
    retry: int

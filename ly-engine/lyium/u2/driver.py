#! /usr/bin/env python
# -*- coding: utf-8 -*-
"""
@Author: Luo Yuqi
@File: driver
@Created: 2023/7/12 14:06
"""
import os


def get_device_id():
    """
    获取设备的 device ID
    """
    status_code = os.system("adb devices")
    if status_code != 0:
        raise SystemError("Verify that adb is properly installed and started")

    _list = os.popen("adb devices | grep -w 'device' | head -1 ")
    device = _list.read()

    if device is None:
        raise NameError("")
    else:
        device_id = device.split("\t")[0]

        return device_id


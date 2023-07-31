#! /usr/bin/env python
# -*- coding: utf-8 -*-
"""
@Author: Luo Yuqi
@File: assert_des
@Created: 2023/7/12 14:26
"""
from lyium.settings import Setting


def insert_assert(describe, result):
    """
    Insert assertion data
        describe(str): Assertion description information
        result(bool): Assertion results
    """
    result = [describe, bool(result)]
    Setting.assert_result.append(result)

#! /usr/bin/env python
# -*- coding: utf-8 -*-
"""
@Author: Luo Yuqi
@File: collect
@Created: 2023/7/12 15:12
"""
import json
import os
from typing import List, Text

from utils.models.model import TestMetrics
from utils.time_fun import time_manager


def get_all_files(file_path, yaml_data_switch=False) -> list:
    """
    获取文件路径
    :param file_path: 目录路径
    :param yaml_data_switch: 是否过滤文件为 yaml格式， True则过滤
    :return:
    """
    filename = []
    # 获取所有文件下的子文件名称
    for root, dirs, files in os.walk(file_path):
        for _file_path in files:
            path = os.path.join(root, _file_path)
            if yaml_data_switch:
                if 'yaml' in path or '.yml' in path:
                    filename.append(path)
            else:
                filename.append(path)
    return filename


class AllureDataCollect:
    """allure 报告数据收集"""

    def __init__(self, path):
        self.path = path
        self.data_path = self.path / "html" / "data" / "test-cases"
        self.summary_path = self.path / "html" / "widgets" / "summary.json"
        self.retry_path = self.path / "html" / "widgets" / "retry-trend.json"

    def get_testcases(self) -> List:
        """ 获取所有 allure 报告中执行用例的情况"""
        # 将所有数据都收集到files中
        files = []
        for i in get_all_files(self.data_path):
            with open(i, 'r', encoding='utf-8') as file:
                date = json.load(file)
                files.append(date)

        return files

    def get_retry_num(self):
        with open(self.retry_path, 'r', encoding='utf-8') as file:
            data = json.load(file)
        retry_count = data[0].get('data').get('retry')
        return retry_count

    def get_failed_case(self) -> List:
        """ 获取到所有失败的用例标题和用例代码路径"""
        error_case = []
        for i in self.get_testcases():
            if i['status'] == 'failed' or i['status'] == 'broken':
                error_case.append(i)
        return error_case

    def get_failed_cases_detail(self) -> Text:
        """ 返回所有失败的测试用例相关内容 """
        date = self.get_failed_case()
        values = ""
        # 判断有失败用例，则返回内容
        if len(date) >= 1:
            values = "失败用例:\n"
            values += "        **********************************\n"
            for i in date:
                values += "        " + i[0] + ":" + i[1] + "\n"
        return values

    def get_uid(self, test_case):
        """
        获取 allure 报告中的 uid
        @param test_case:
        @return:
        """
        uid = test_case['uid']
        return uid

    def get_case_name(self, test_case):
        """
        收集测试用例名称
        @return:
        """
        name = test_case['name']
        return name

    def get_case_start(self, test_case):
        """
        收集测试用例开始时间
        @return:
        """
        data = int(test_case['time'].get("start", None))
        return time_manager.strftime_now("%Y-%m-%d %H:%M:%S", data / 1000)

    def get_case_stop(self, test_case):
        """
        收集测试用例结束时间
        @return:
        """
        data = int(test_case['time'].get("stop", None))
        return time_manager.strftime_now("%Y-%m-%d %H:%M:%S", data / 1000)

    def get_case_time(self, test_case):
        """
        获取用例运行时长
        @param test_case:
        @return:
        """
        data = test_case['time'].get("duration", None) / 1000
        return time_manager.s_to_hms(data)

    def get_case_full_name(self, test_case):
        """
        收集测试用例完整路径
        @return:
        """
        name = test_case['fullName']
        return name

    def get_case_status(self, test_case):
        """
        收集测试用例状态
        @return:
        """
        name = test_case['status']
        return name

    def get_case_status_trace(self, test_case):
        """
        收集测试用例trace
        @return:
        """
        name = test_case['statusTrace']
        return name

    def get_case_count(self) -> "TestMetrics":
        """ 统计用例数量 """
        try:
            with open(self.summary_path, 'r', encoding='utf-8') as file:
                data = json.load(file)
            _case_count = data['statistic']
            _time = data['time']

            keep_keys = {"passed", "failed", "broken", "skipped", "total"}
            run_case_data = {k: v for k, v in data['statistic'].items() if k in keep_keys}
            # 判断运行用例总数大于0
            if _case_count["total"] > 0:
                # 计算用例成功率
                run_case_data["pass_rate"] = round(
                    (_case_count["passed"] + _case_count["skipped"]) / _case_count["total"] * 100, 2
                )
            else:
                # 如果未运行用例，则成功率为 0.0
                run_case_data["pass_rate"] = 0.0
            # 收集用例运行时长
            run_case_data['start_time'] = time_manager.timestamp_to_str(_time["start"])
            run_case_data['stop_time'] = time_manager.timestamp_to_str(_time["stop"])
            run_case_data['duration'] = _time if run_case_data['total'] == 0 else time_manager.s_to_hms(
                _time['duration'] / 1000)
            run_case_data['retry'] = self.get_retry_num()
            return TestMetrics(**run_case_data)
        except FileNotFoundError as exc:
            raise FileNotFoundError(
                "程序中检查到您未生成allure报告，"
                "通常可能导致的原因是allure环境未配置正确，"
                "详情可查看如下博客内容："
                "https://blog.csdn.net/weixin_43865008/article/details/124332793"
            ) from exc

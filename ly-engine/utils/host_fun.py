#! /usr/bin/env python
# -*- coding: utf-8 -*-
"""
@Author: Luo Yuqi
@File: host_fun
@Created: 2023/7/13 15:15
"""
import inspect
import os
import platform
from types import MethodType, FunctionType

from loguru import logger

from conf.config import Config, ROOT
from utils import py
from utils.common import get_host_ip, get_free_port
from utils.errors import InvalidTestError, InvalidRepoError
from utils.path_fun import Path, parse_repo_root
from utils.remote_fun import Remote
from utils.repo import Repo


class Host(dict):
    def __init__(self, ip=None, port=None):
        super().__init__()
        self.name = Config.yaml_data.host.name
        self.workspace = ROOT / "repos"
        self.ip = ip or get_host_ip()
        self.port = port or get_free_port()
        self.sys_version = f'{platform.system()} {platform.version()}, {platform.processor()}, python {platform.python_version()}'
        self.remote = Remote(name=self.name, address=Config.yaml_data.host.address,
                             username=Config.yaml_data.host.username,
                             password=Config.yaml_data.host.password)
        self.repos = []
        self.load_repo()

    def register(self):
        self._register_host()
        logger.info("注册host成功")
        # self._register_devices()
        # logger.info("注册设备成功")

    def _register_host(self):
        """
        注册执行主机
        """
        data = dict(Name=self.name, Ip=self.ip, Port=self.port, Category=Config.yaml_data.host.category,
                    Platform=self.sys_version, Repo=self.workspace)
        json_data = self.remote.register_host(**data)
        self.update(**json_data)
        return json_data

    # def _register_devices(self):
    #     """
    #     注册设备
    #     """
    #     host = self["data"]["host"]["ID"]
    #     for device in device_pool.devices.values():
    #         data = dict(Name=device.serial, Serial=device.serial, Brand=device.brand, Model=device.model,
    #                     Platform="android", PlatformVersion=device.platform_version, Host=host)
    #         self.remote.register_device(**data)

    def load_repo(self, **extra):
        # 从repo_root加载
        if os.path.exists(self.workspace):
            repo_root = Path(self.workspace)
            for path in repo_root.dirs():
                name = path.basename
                if name.startswith('.') or name.startswith('__'):
                    continue
                self.get_repo(path)
        for name, path in extra.items():
            if path:
                self.get_repo(path)

    def get_repo(self, target, reload=False):
        """获取目标对象所在等仓库"""
        git_path = None
        if isinstance(target, (type, MethodType, FunctionType)):
            target = inspect.getmodule(target)
        if inspect.ismodule(target):
            module_name = target.__name__
            if module_name == '__main__':
                _, root_package = parse_repo_root(target.__file__)
            else:
                root_package = module_name.split('.')[0]
        elif isinstance(target, str):
            if os.path.exists(target):
                git_path = target
                repo_path, root_package = parse_repo_root(target)
                py.insert(repo_path.parent)
            else:
                root_package = target
        else:
            raise InvalidTestError(target)
        for repo in self.repos:
            if repo.name == root_package:
                if reload:
                    repo.reload()
                return repo
        # 如果没有找到，则注册
        if not root_package:
            raise InvalidRepoError(target)
        module = __import__(root_package)
        repo = Repo(module, git_path=git_path)
        self.repos.append(repo)
        repo.name = root_package
        return repo

    def add_object(self, o, category=None):
        repo = self.get_repo(o)
        repo.add(o, category=category)

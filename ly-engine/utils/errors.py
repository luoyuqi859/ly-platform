#! /usr/bin/env python
# -*- coding: utf-8 -*-
"""
@Author: Luo Yuqi
@File: errors
@Created: 2023/7/13 15:30
"""
import traceback
from contextlib import contextmanager

from loguru import logger


class BaseError(Exception):
    """Base class for exceptions in this module."""

    def __init__(self, message="", *args, **kwargs):
        self.message = message
        self.data = kwargs.pop('data', None)
        if args or kwargs:
            self.message = message.format(*args, **kwargs)

    def __repr__(self):
        return repr(self.message)


class InvalidTestError(BaseError):
    """"""


class RootError(BaseError):
    """"""


class TestFailedError(BaseError):
    """"""


class FileNotExistError(BaseError):
    """file does not exist."""


class InvalidMatchingMethodError(BaseError):
    """
        This is InvalidMatchingMethodError BaseError
        When an invalid matching method is used in settings.
    """


class UiaError(BaseError):
    """"""


class AdbError(BaseError):
    """"""


class WatcherNotRegisteredError(UiaError):
    """"""


class ElementNotFoundError(BaseError):
    """element not found"""


class TestError(BaseError):
    """test errors"""


class InvalidRepoError(Exception):
    def __init__(self, repo):
        super().__init__(f'Invalid repo: {repo}')


@contextmanager
def ignore(*errors):
    """
    执行代码块并忽略指定异常
    :param errors: 要忽略的错误类型，不指定则意味着忽略所有的异常
    :return:
    """
    try:
        yield
    except errors or Exception:
        logger.error(traceback.format_exc())


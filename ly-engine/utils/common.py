#! /usr/bin/env python
# -*- coding: utf-8 -*-
"""
@Author: Luo Yuqi
@File: common
@Created: 2023/7/13 11:23
"""
import os
import socket
import subprocess

from loguru import logger


def execute_command(cmd, timeout=None):
    """
    Execute local commands
    :param cmd: Full command text
    :param timeout: Execution timeout
    :return: None
    """
    logger.debug("cmd in: %s" % cmd)
    proc = subprocess.Popen(cmd, stdout=subprocess.PIPE, shell=True, stderr=subprocess.PIPE)
    try:
        outs, errs = proc.communicate(timeout=timeout)
        status = proc.wait()
        logger.debug("cmd out: %s cmd status: %s" % (outs.decode(), status))
    except subprocess.TimeoutExpired as tex:
        logger.debug("TimeoutExpired: %s" % tex)
        proc.kill()
        outs, errs = proc.communicate()
        logger.debug("cmd out: %s" % outs.decode())
    except Exception as ex:
        logger.debug("Exception: %s" % ex)


def get_free_port():
    """
    获取空闲端口

    :return:
    """
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.bind(('localhost', 0))
    try:
        return s.getsockname()[1]
    finally:
        s.close()


def get_host_ip():
    """
    获取本机IP
    """
    with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
        s.connect(('8.8.8.8', 80))
        return s.getsockname()[0]


def get_local_ip():
    """
    copy and paste from
    https://stackoverflow.com/questions/166506/finding-local-ip-addresses-using-pythons-stdlib
    """
    if os.environ.get('CHAT_HOST_IP', False):
        return os.environ['CHAT_HOST_IP']
    try:
        ip = [l for l in (
            [ip for ip in socket.gethostbyname_ex(socket.gethostname())[2] if
             not ip.startswith("127.")][:1], [
                [(s.connect(('8.8.8.8', 53)), s.getsockname()[0], s.close()) for s
                 in
                 [socket.socket(socket.AF_INET, socket.SOCK_DGRAM)]][0][1]]) if l][
            0][
            0]
    except OSError as e:
        print(e)
        return '127.0.0.1'

    return ip




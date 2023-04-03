<template>
    <div class="menu-wrapper">
        <el-menu-item index="/home" :route="{ path: '/home' }">
            <template #title>
                <el-icon>
                    <HomeFilled />
                </el-icon>
                <span>首页</span>
            </template>
        </el-menu-item>

        <el-sub-menu index="/system">
            <template #title>
                <el-icon>
                    <Setting />
                </el-icon>
                <span>系统管理</span>
            </template>
            <el-menu-item index="/user/list" :route="{ path: '/user/list' }">用户列表</el-menu-item>
            <el-menu-item index="/host/detail">xxx</el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="/host">
            <template #title>
                <el-icon>
                    <Monitor />
                </el-icon>
                <span>主机管理</span>
            </template>
            <el-menu-item index="/host/list" :route="{ path: '/host/list' }">主机列表</el-menu-item>
            <el-menu-item index="/host/detail">xxx</el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="/device">
            <template #title>
                <el-icon>
                    <Iphone />
                </el-icon>
                <span>设备管理</span>
            </template>
            <el-menu-item index="/device/list" :route="{ path: '/device/list' }">设备列表</el-menu-item>
            <el-menu-item index="/device/detail">xxx</el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="/task">
            <template #title>
                <el-icon>
                    <List />
                </el-icon>
                <span>任务管理</span>
            </template>
            <el-menu-item index="/task/list"  :route="{ path: '/task/list' }">任务列表</el-menu-item>
            <el-menu-item index="1-2">报告</el-menu-item>
        </el-sub-menu>
    </div>
</template>
<script lang="ts" setup>
</script>

<style lang="scss" scoped>
.icon {
    // margin-bottom: 3px;
    display: inline-block;
    vertical-align: top;
}
</style>
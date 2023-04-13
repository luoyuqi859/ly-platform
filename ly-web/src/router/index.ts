import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

import Layout from '@/layout/index.vue'

export const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import("@/views/login/index.vue"),
    },
    {
        path: '/home',
        component: Layout,
        children: [
            {
                path: 'dashboard',
                name: 'Dashboard',
                component: () => import('@/views/home/index.vue'),
                meta: { title: '仪表面板', icon: 'dashboard' },
            }
        ]
    },
    {
        path: '/host',
        component: Layout,
        name: 'Host',
        meta: { title: '主机管理', icon: 'client' },
        children: [
            {
                path: 'table',
                name: 'Table',
                component: () => import('@/views/host/hostList.vue'),
                meta: { title: '主机列表', icon: 'dashboard' },
                children: [
                ]
            },
            {
                path: 'config',
                name: 'Config',
                component: () => import('@/views/host/viewConfig.vue'),
            },
        ]
    },
    {
        path: '/device',
        component: Layout,
        name: 'Device',
        meta: { title: '设备中心', icon: 'phone' },
        children: [
            {
                path: 'list',
                name: 'List',
                component: () => import('@/views/device/deviceList.vue'),
                meta: { title: '设备列表', icon: 'dashboard' },
                children: [
                ]
            },
            {
                path: 'performance',
                name: 'Performance',
                component: () => import('@/views/device/performance.vue'),
            },
        ]
    },
    {
        path: '/task',
        component: Layout,
        name: 'Task',
        meta: { title: '任务管理', icon: 'documentation' },
    },

    // {
    //     path: "/layout",
    //     name: 'Layout',
    //     component: () => import("@/layout/index.vue"),
    //     children: [
    //         {
    //             path: '/home',
    //             name: 'Home',
    //             component: () => import("@/views/home/index.vue"),
    //             meta: {
    //                 requireAuth: true,
    //                 title:"首页",
    //                 icon: 'home'
    //             }
    //         },
    //         {
    //             path: '/user/list',
    //             name: 'User-List',
    //             component: () => import("@/views/system/user/index.vue"),
    //             meta: {
    //                 requireAuth: true,
    //                 title:"用户列表",
    //                 icon: 'user'
    //             }
    //         },
    //         {
    //             path: '/device/list',
    //             name: 'Device-List',
    //             component: () => import("@/views/device/deviceList.vue"),
    //             meta: {
    //                 requireAuth: true,
    //                 title:"设备列表",
    //                 icon: 'user'
    //             }
    //         },
    //         {
    //             path: '/device/minicap',
    //             name: 'Device-Minicap',
    //             component: () => import("@/views/device/minicap.vue"),
    //             meta: {
    //                 requireAuth: true,
    //                 title:"xxx",
    //                 icon: 'user'
    //             }
    //         },
    //         {
    //             path: '/host/list',
    //             name: 'Host-List',
    //             component: () => import("@/views/host/hostList.vue"),
    //             meta: {
    //                 requireAuth: true,
    //                 title:"主机列表",
    //                 icon: 'dashboard',
    //             }
    //         },
    //         {
    //             path: '/ide',
    //             name: 'Ide',
    //             component: () => import("@/views/ide/index.vue"),
    //             meta: {
    //                 requireAuth: true,
    //                 title:"IDE"
    //             }
    //         },
    //         {
    //             path: '/task/list',
    //             name: 'Task-List',
    //             component: () => import("@/views/task/taskList.vue"),
    //             meta: {
    //                 requireAuth: true,
    //                 title:"任务列表",
    //                 icon: 'user'
    //             }
    //         }
    //     ]
    // },

]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import Layout from '@/layout/index.vue'



declare module 'vue-router' {
    interface RouteMeta {
        hidden?: boolean;
        title?: string;
        icon?: string;
        elSvgIcon?: string;
        permissions?: string[]
    }
    interface _RouteRecordBase {
        hidden?: boolean;
        parentPath?: string;
        permissions?: string[]

    }
    interface _RouteLocationBase {
        title?: string;
    }
}

export const routes: RouteRecordRaw[] = [
    {
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [
            {
                path: '/redirect/:path(.*)',
                component: () => import('@/views/redirect/index.vue'),
            },
        ],
    },
    {
        path: "/",
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import("@/views/login/index.vue"),
        hidden: true,
    },
    {
        path: '/register',
        component: () => import("@/views/register/index.vue"),
        hidden: true,
    },
    {
        path: '/:pathMatch(.*)*',
        component: () => import('@/views/error/404.vue'),
        hidden: true,
    },
    {
        path: '/401',
        component: () => import('@/views/error/401.vue'),
        hidden: true,
    },
    {
        path: '',
        component: Layout,
        children: [
            {
                path: '/index',
                name: 'Index',
                component: () => import('@/views/home/index.vue'),
                meta: { title: '首页', icon: 'dashboard', affix: true },
            }
        ]
    },
    {
        path: '/user',
        component: Layout,
        hidden: true,
        redirect: 'noredirect',
        children: [
            {
                path: 'profile',
                component: () => import('@/views/user/profile/index.vue'),
                name: 'Profile',
                meta: { title: '个人中心', icon: 'user' },
            },
        ],
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
                hidden: true,
                meta: { title: '配置文件' },
            },
            {
                path: 'executeStep',
                name: 'ExecuteStep',
                component: () => import('@/views/host/executeStep.vue'),
                hidden: true,
                meta: { title: 'PyAuto用例执行' },
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
                hidden: true,
                meta: { title: '性能测试' },
            },
            {
                path: 'projectionScreen',
                name: 'ProjectionScreen',
                component: () => import('@/views/device/projectionScreen.vue'),
                hidden: true,
                meta: { title: '投屏' },
            },
        ]
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
    // 用于控制页面切换时滚动条的位置。如果从之前的页面返回到当前页面时保存了滚动条位置，则恢复该位置；否则，将滚动条位置设置为顶部
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { top: 0 };
        }
    },
});


export default router;
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";


export const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import("@/views/login/index.vue")
    },
    {
        path: "/layout",
        name: 'Layout',
        component: () => import("@/layout/index.vue"),
        children: [
            {
                path: '/home',
                name: 'Home',
                component: () => import("@/views/home/index.vue"),
                meta: {
                    requireAuth: true,
                }
            },
            {
                path: '/user/list',
                name: 'User-List',
                component: () => import("@/views/system/user/index.vue"),
                meta: {
                    requireAuth: true,
                }
            },
            {
                path: '/device/list',
                name: 'Device-List',
                component: () => import("@/views/device/deviceList.vue"),
                meta: {
                    requireAuth: true,
                }
            },
            {
                path: '/host/list',
                name: 'Host-List',
                component: () => import("@/views/host/hostList.vue"),
                meta: {
                    requireAuth: true,
                }
            },
            {
                path: '/task/list',
                name: 'Task-List',
                component: () => import("@/views/task/taskList.vue"),
                meta: {
                    requireAuth: true,
                }
            }
        ]
    },

]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
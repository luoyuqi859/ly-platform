import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
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
        path: "/index",
        name: '首页',
        component: () => import("@/views/layout/index.vue"),
        children: [
            {
                path: '/home/dashboard',
                name: '主页',
                component: () => import("@/views/home/index.vue"),
                meta: {
                    requireAuth: true
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
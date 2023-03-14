import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: '',
        component: () => import("@/views/login/index.vue"),
        meta: {
            requireAuth: false
        }
    },
    {
        path: "/index",
        name: '首页',
        component: () => import("@/views/layout/index.vue"),
        children:[
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
    history: createWebHistory(),
    routes,
});

export default router;
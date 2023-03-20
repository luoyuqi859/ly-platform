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
        path: "/layout",
        name: 'Layout',
        component: () => import("@/views/layout/index.vue"),
        children: [
            {
                path: '/home',
                name: 'Home',
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
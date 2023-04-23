import router from './router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { getToken } from '@/utils/auth';


NProgress.configure({ showSpinner: false });


router.afterEach(() => {
    NProgress.done();
});

// 导航守卫, 没登录跳转登录页
router.beforeEach((to, from, next) => {
    NProgress.start();
    if (to.path === '/login') return next()
    // 获取token
    const tokenStr = getToken()
    if (!tokenStr) return next('/login')
    next()
})

import tab from './tab';
import cache from './cache';

export default function installPlugins(app: any) {
    // 页签操作
    app.config.globalProperties.$tab = tab;
    // 缓存对象
    app.config.globalProperties.$cache = cache;

}
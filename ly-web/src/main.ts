import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Cookies from 'js-cookie';

import ElementPlus from 'element-plus';
import locale from 'element-plus/lib/locale/lang/zh-cn'; // 中文语言
import '@/assets/styles/index.scss' // global css
// element css
import 'element-plus/dist/index.css'

// svg图标
import 'virtual:svg-icons-register';
import SvgIcon from '@/components/SvgIcon/index.vue';
import elementIcons from '@/components/SvgIcon/svgicon';


import router from './router'
import store from './store';


// 分页组件
import Pagination from '@/components/Pagination/index.vue';



const app = createApp(App)
// 添加 Vue 类型声明

// 全局组件挂载
app.component('Pagination', Pagination);


// element plus组件
// app.use(ElementPlus, { locale: locale})
app.use(elementIcons)

const size = String(Cookies.get('size')) || 'default'; // 将返回值转换为字符串类型
// 使用element-plus 并且设置全局的大小
app.use(ElementPlus, {
    locale: locale,
    // 支持 large、default、small
    size: size === 'large' || size === 'small' ? size : 'default', // 只接受参数 medium、small 和 mini
});


//自定义图标
app.component('svg-icon', SvgIcon);

// 路由
app.use(router)

// pinia
app.use(store)

app.mount('#app')
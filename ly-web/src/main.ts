import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/lib/locale/lang/zh-cn' // 中文语言

import '@/assets/styles/index.scss' // global css

// svg图标
import 'virtual:svg-icons-register'
import svgIcon from '@/components/SvgIcon/index.vue'
import elementIcons from '@/components/SvgIcon/svgicon'


import router from './router'
import store from './pinia'



const app = createApp(App)
// 添加 Vue 类型声明



// element plus组件
app.use(ElementPlus, { locale: locale })
app.use(elementIcons)

//自定义图标
app.component('svg-icon', svgIcon)

// 路由
app.use(router)

// pinia
app.use(store)

app.mount('#app')
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import { store } from './pinia'


const app = createApp(App)

// element plus组件
app.use(ElementPlus)

// 路由
app.use(router)

// pinia
app.use(store)

app.mount('#app')
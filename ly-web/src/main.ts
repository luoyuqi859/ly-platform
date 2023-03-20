import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import router from './router'
import { store } from './pinia'
import NProgress from '@/utils/progress'
// 统一导入el-icon图标
import * as ElIconModules from '@element-plus/icons-vue'

NProgress.start()


const app = createApp(App)
// 添加 Vue 类型声明



// element plus组件
app.use(ElementPlus, { locale: zhCn })

// 路由
app.use(router)

// pinia
app.use(store)

app.mount('#app')
import { asyncMenu } from "@/api/menu"
import { asyncRouterHandle } from "@/utils/asyncRouter"
import { emitter } from "@/utils/bus"
import { defineStore } from "pinia"
import { ref } from "vue"



const routerListArr: any = []
const notLayoutRouterArr: any = []
const keepAliveRoutersArr: any = []
const nameMap: any = {}

const formatRouter = (routes: any, routeMap: any) => {
    routes && routes.forEach((item: any) => {
        if ((!item.children || item.children.every((ch: any) => ch.hidden)) && item.name !== '404' && !item.hidden) {
            routerListArr.push({ label: item.meta.title, value: item.name })
        }
        item.meta.btns = item.btns
        item.meta.hidden = item.hidden
        if (item.meta.defaultMenu === true) {
            notLayoutRouterArr.push({
                ...item,
                path: `/${item.path}`,
            })
        } else {
            routeMap[item.name] = item
            if (item.children && item.children.length > 0) {
                formatRouter(item.children, routeMap)
            }
        }
    })
}

const KeepAliveFilter = (routes: any) => {
    routes && routes.forEach((item: any) => {
        // 子菜单中有 keep-alive 的，父菜单也必须 keep-alive，否则无效。这里将子菜单中有 keep-alive 的父菜单也加入。
        if ((item.children && item.children.some((ch: any) => ch.meta.keepAlive) || item.meta.keepAlive)) {
            item.component && item.component().then((val: any) => {
                keepAliveRoutersArr.push(val.default.name)
                nameMap[item.name] = val.default.name
            })
        }
        if (item.children && item.children.length > 0) {
            KeepAliveFilter(item.children)
        }
    })
}



export const useRouterStore = defineStore('router', () => {
    const keepAliveRouters = ref([])
    const asyncRouterFlag = ref(0)
    const setKeepAliveRouters = (history: any) => {
        const keepArrTemp: any = []
        history.forEach((item: any) => {
            if (nameMap[item.name]) {
                keepArrTemp.push(nameMap[item.name])
            }
        })
        keepAliveRouters.value = Array.from(new Set(keepArrTemp))
    }
    emitter.on('setKeepAlive', setKeepAliveRouters)

    const asyncRouters = ref([])
    const routerList = ref(routerListArr)
    const routeMap = ({})
    // 从后台获取动态路由
    const SetAsyncRouter = async () => {
        asyncRouterFlag.value++
        const baseRouter: any = [{
            path: '/layout',
            name: 'layout',
            component: 'views/layout/index.vue',
            meta: {
                title: '底层layout'
            },
            children: []
        }]
        const asyncRouterRes = await asyncMenu()
        const asyncRouter = asyncRouterRes.data.menus
        asyncRouter && asyncRouter.push({
            path: '404',
            name: '404',
            hidden: true,
            meta: {
                title: '迷路了*。*',
                closeTab: true,
            },
            component: 'views/error/index.vue'
        }, {
            path: 'reload',
            name: 'Reload',
            hidden: true,
            meta: {
                title: '',
                closeTab: true,
            },
            component: 'views/error/reload.vue'
        })
        formatRouter(asyncRouter, routeMap)
        baseRouter[0].children = asyncRouter
        if (notLayoutRouterArr.length !== 0) {
            baseRouter.push(...notLayoutRouterArr)
        }
        baseRouter.push({
            path: '/:catchAll(.*)',
            redirect: '/layout/404'

        })
        asyncRouterHandle(baseRouter)
        KeepAliveFilter(asyncRouter)
        asyncRouters.value = baseRouter
        routerList.value = routerListArr
        return true
    }

    return {
        asyncRouters,
        routerList,
        keepAliveRouters,
        asyncRouterFlag,
        SetAsyncRouter,
        routeMap
    }
})

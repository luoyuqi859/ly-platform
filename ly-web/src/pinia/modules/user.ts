import { getUserInfo, login } from '@/api/user'
import router from '@/router'
import commonStorage from '@/utils/localstorige'
import { ElLoading, ElMessage } from 'element-plus'
import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { useRouterStore } from '@/pinia/modules/router'
import { jsonInBlacklist } from '@/api/jwt'

export const useUserStore = defineStore("user", () => {
    const loadingInstance: any = ref(null)
    const userInfo: any = ref({
        uuid: '',
        nickName: '',
        headerImg: '',
        authority: {},
        sideMode: 'dark',
        activeColor: 'var(--el-color-primary)',
        baseColor: '#fff'
    })
    const token = ref(commonStorage.get('token') || '')
    const setUserInfo = (val: any) => {
        userInfo.value = val
    }
    const setToken = (val: string) => {
        token.value = val
    }


    const NeedInit = () => {
        token.value = ''
        commonStorage.del('token')
        commonStorage.clear()
        router.push({ name: 'Init', replace: true })
    }
    const ResetUserInfo = (value = {}) => {
        userInfo.value = {
            ...userInfo.value,
            ...value
        }
    }
    /* 获取用户信息*/
    const GetUserInfo = async () => {
        const res: any = await getUserInfo()
        if (res.code === 0) {
            setUserInfo(res.data.userInfo)
        }
        return res
    }

    /* 登录*/
    const LoginIn = async (loginInfo: any) => {
        loadingInstance.value = ElLoading.service({
            fullscreen: true,
            text: '登录中，请稍候...',
        })
        try {
            const res: any = await login(loginInfo)
            if (res.code === 0) {
                setUserInfo(res.data.user)
                setToken(res.data.token)
                const routerStore = useRouterStore()
                await routerStore.SetAsyncRouter()
                const asyncRouters = routerStore.asyncRouters
                asyncRouters.forEach(asyncRouter => {
                    router.addRoute(asyncRouter)
                })
                await router.replace({ name: userInfo.value.authority.defaultRouter })
                loadingInstance.value.close()
                return true
            }
        } catch (e) {
            loadingInstance.value.close()
        }
        loadingInstance.value.close()
    }

    /* 登出*/
    const LoginOut = async () => {
        const res: any = await jsonInBlacklist()
        if (res.code === 0) {
            token.value = ''
            sessionStorage.clear()
            localStorage.clear()
            router.push({ name: 'Login', replace: true })
            window.location.reload()
        }
    }

    /* 清理数据 */
    const ClearStorage = async () => {
        token.value = ''
        sessionStorage.clear()
        localStorage.clear()
    }
    /* 设置侧边栏模式*/
    const changeSideMode = async (data: any) => {
        const res: any = await setUserInfo({ sideMode: data })
        if (res.code === 0) {
            userInfo.value.sideMode = data
            ElMessage({
                type: 'success',
                message: '设置成功'
            })
        }
    }
    const mode = computed(() => userInfo.value.sideMode)
    const sideMode = computed(() => {
        if (userInfo.value.sideMode === 'dark') {
            return '#191a23'
        } else if (userInfo.value.sideMode === 'light') {
            return '#fff'
        } else {
            return userInfo.value.sideMode
        }
    })

    const baseColor = computed(() => {
        if (userInfo.value.sideMode === 'dark') {
            return '#fff'
        } else if (userInfo.value.sideMode === 'light') {
            return '#191a23'
        } else {
            return userInfo.value.baseColor
        }
    })

    const activeColor = computed(() => {
        return 'var(--el-color-primary)'
    })

    watch(() => token.value, () => {
        commonStorage.set('token', token.value)
    })

    return {
        userInfo,
        token,
        NeedInit,
        ResetUserInfo,
        GetUserInfo,
        LoginIn,
        LoginOut,
        changeSideMode,
        mode,
        sideMode,
        setToken,
        baseColor,
        activeColor,
        loadingInstance,
        ClearStorage
    }


})

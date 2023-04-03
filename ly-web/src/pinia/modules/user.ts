import { getUserInfo, login, logout } from '@/api/user'
import router from '@/router'
import commonStorage from '@/utils/localstorige'
import { ElLoading, ElMessage } from 'element-plus'
import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { jsonInBlacklist } from '@/api/jwt'
import { getToken, removeToken, setToken } from '@/utils/auth'
import defAva from '@/assets/images/profile.jpg'




export const useUserStore = defineStore("user", {
    state: () => ({
        token: getToken(),
        name: '',
        avatar: defAva,
        roles: [],
        permissions: []
    }),
    actions: {
        // 登录
        login(userInfo: any) {
            return new Promise<void>((resolve, reject) => {
                login(userInfo).then(res => {
                    console.log(res)
                    let data = res.data
                    setToken(data.token)
                    this.token = data.token
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 退出系统
        logOut() {
            return new Promise<void>((resolve, reject) => {
                logout().then(() => {
                    this.token = ''
                    this.roles = []
                    this.permissions = []
                    removeToken()
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        }

    }
})

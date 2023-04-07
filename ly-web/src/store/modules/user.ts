import { defineStore } from 'pinia';
import defAva from '@/assets/images/profile.jpg'
import { login, logout } from '@/api/user';
import { getToken, removeToken, setToken } from '@/utils/auth';


const useUserStore = defineStore('user', {
    state: (): {
        token?: string;
        name: string;
        avatar: string;
        roles: any[];
        permissions: string[];
    } => ({
        token: getToken(),
        name: '',
        avatar: defAva,
        roles: [],
        permissions: [],
    }),
    actions: {
        // 登录
        login(userInfo: any) {
            return new Promise((resolve, reject) => {
                login(userInfo).then(res => {
                    console.log(res)
                    let data = res.data
                    setToken(data.token)
                    this.token = data.token
                    resolve(1);
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 退出系统
        logOut() {
            return new Promise((resolve, reject) => {
                logout()
                    .then(() => {
                        this.token = '';
                        this.roles = [];
                        this.permissions = [];
                        removeToken();
                        resolve(1);
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        },
    },
});

export default useUserStore;
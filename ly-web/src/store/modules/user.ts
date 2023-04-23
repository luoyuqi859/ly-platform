import { defineStore } from 'pinia';
import defAva from '@/assets/images/profile.jpg'
import { getUserInfo, login, logout } from '@/api/user';
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
        // 获取用户信息
        getInfo() {
            return new Promise((resolve, reject) => {
                getUserInfo()
                    .then((res: any) => {
                        const user = res.data.userInfo;
                        const avatar =
                            user.avatar === '' || user.avatar == null
                                ? defAva
                                : import.meta.env.VITE_APP_BASE_API + user.avatar;

                        // if (res.roles && res.roles.length > 0) {
                        //     // 验证返回的roles是否是一个非空数组
                        //     this.roles = res.roles;
                        //     this.permissions = res.permissions;
                        // } else {
                        //     this.roles = ['ROLE_DEFAULT'];
                        // }
                        this.name = user.userName;
                        this.avatar = avatar;
                        resolve(res);
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
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
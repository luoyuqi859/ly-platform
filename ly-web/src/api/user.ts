import service from '@/utils/request'

// @Summary 用户登录
export const login = (data: any) => {
    return service({
        url: '/base/login',
        headers: {
            isToken: false
        },
        method: 'post',
        data: data
    })
}

// @Summary 用户注册
export const register = (data: any) => {
    return service({
        url: '/user/register',
        headers: {
            isToken: false
        },
        method: 'post',
        data: data
    })
}

// @Summary 用户退出
export const logout = () => {
    return service({
        url: '/user/logout',
        method: 'post',
    })
}

// @Summary 设置用户信息
export const setUserInfo = (data: any) => {
    return service({
        url: '/user/setUserInfo',
        method: 'put',
        data: data
    })
}

// @Summary 获取用户信息
export const getUserList = (data: any) => {
    return service({
        url: '/user/list',
        method: 'post',
        data: data
    })
}

// @Summary 获取用户信息
export const getUserInfo = () => {
    return service({
        url: '/user/info',
        method: 'get'
    })
}
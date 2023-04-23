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
        url: '/base/register',
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
        url: '/base/logout',
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

// @Summary 获取用户列表
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

// @Summary 修改密码
export const updateUserPwd = (data: any) => {
    return service({
        url: '/user/changePassword',
        method: 'post',
        data: data
    })
}

// 用户头像上传
export function uploadAvatar(data: any) {
    return service({
        url: '/user/profile/avatar',
        method: 'post',
        data: data,
    });
}
import service from '@/utils/request'

// @Summary 用户登录
// @Produce  application/json
// @Param data body {username:"string",password:"string"}
// @Router /base/login [post]
export const login = (data: any) => {
    return service({
        url: '/base/login',
        method: 'post',
        data: data
    })
}

// @Summary 用户注册
// @Produce  application/json
// @Param data body {username:"string",password:"string"}
// @Router /base/resige [post]
export const register = (data: any) => {
    return service({
        url: '/user/register',
        method: 'post',
        data: data
    })
}

// @Tags SysUser
// @Summary 设置用户信息
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SysUser true "设置用户信息"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"修改成功"}"
// @Router /user/setUserInfo [put]
export const setUserInfo = (data: any) => {
    return service({
        url: '/user/setUserInfo',
        method: 'put',
        data: data
    })
}

// @Tags User
// @Summary 获取用户信息
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Success 200 {string} json "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /user/getUserInfo [get]
export const getUserInfo = () => {
    return service({
        url: '/user/getUserInfo',
        method: 'get'
    })
}
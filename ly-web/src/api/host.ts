import service from "@/utils/request"

// @Summary 获取主机列表
export const getHostList = (data: any) => {
    return service({
        url: '/host/list',
        method: 'post',
        data: data
    })
}

export const checkHostPermission = (data: any) => {
    return service({
        url: '/host/checkHostPermission',
        method: 'post',
        data: data
    })
}

// @Summary 根据用户id获取主机
export const getHostByUserId = (data: any) => {
    return service({
        url: '/host/getHostByUserID',
        method: 'post',
        data: data
    })
}

// @Summary 根据host id获取主机
export const getHostByHostID = (data: any) => {
    return service({
        url: '/host/getHostByHostID',
        method: 'post',
        data: data
    })
}

// @Summary 执行机状态变更
export const hostStatusModify = (data: any) => {
    return service({
        url: '/host/status/modify',
        method: 'post',
        data: data
    })
}

// @Summary 获取执行机状态
export const getHostStatus = (data: any) => {
    return service({
        url: '/host/getHostStatus',
        method: 'post',
        data: data
    })
}
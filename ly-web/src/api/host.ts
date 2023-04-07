import service from "@/utils/request"

// @Summary 获取主机列表
export const getHostList = (data: any) => {
    return service({
        url: '/host/list',
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
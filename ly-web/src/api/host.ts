import service from "@/utils/request"

// @Summary 获取主机列表
export const getHostList = (data: any) => {
    return service({
        url: '/host/list',
        method: 'post',
        data: data
    })
}
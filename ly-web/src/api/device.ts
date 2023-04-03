import service from "@/utils/request"

// @Summary 获取设备列表
export const getDeviceList = (data: any) => {
    return service({
        url: '/device/list',
        method: 'post',
        data: data
    })
}
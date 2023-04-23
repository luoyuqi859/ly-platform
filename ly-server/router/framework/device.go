package framework

import (
	"ly-server/api"
	"ly-server/middlewares"

	"github.com/gin-gonic/gin"
)

type DeviceRouter struct{}

func (r *DeviceRouter) InitDeviceRouter(Router *gin.RouterGroup) {
	DeviceRouter := Router.Group("device").Use(middlewares.OperationRecord())
	DeviceRouterWithoutRecord := Router.Group("device")
	DeviceApi := api.ApiGroupApp.FrameworkApiGroup.DeviceApi
	{
		DeviceRouter.POST("register", DeviceApi.Register)        // 设备注册
	}
	{
		DeviceRouterWithoutRecord.POST("list", DeviceApi.GetDeviceList) 
		DeviceRouterWithoutRecord.POST("getDevicesByUserID", DeviceApi.GetDevicesByUserID)   // 根据用户id获取host

	}
}
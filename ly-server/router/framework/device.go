package framework

import (
	"ly-server/api"

	"github.com/gin-gonic/gin"
)

type DeviceRouter struct{}

func (r *DeviceRouter) InitDeviceRouter(Router *gin.RouterGroup) {
	DeviceRouter := Router.Group("device").Use()
	DeviceApi := api.ApiGroupApp.FrameworkApiGroup.DeviceApi
	{
		DeviceRouter.POST("register", DeviceApi.Register)        // 设备注册
	}
}
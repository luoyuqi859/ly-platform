package framework

import (
	"ly-server/api"
	"ly-server/middlewares"

	"github.com/gin-gonic/gin"
)

type HostRouter struct{}

func (r *HostRouter) InitHostRouter(Router *gin.RouterGroup) {
	hostRouter := Router.Group("host").Use(middlewares.OperationRecord())
	hostRouterWithoutRecord := Router.Group("host")
	hostApi := api.ApiGroupApp.FrameworkApiGroup.HostApi
	{
		hostRouter.POST("register", hostApi.Register)        // 执行主机注册
	}
	{
		hostRouterWithoutRecord.POST("list", hostApi.GetHostList) 
		hostRouterWithoutRecord.POST("getHostByUserID", hostApi.GetHostByUserID)   // 根据用户id获取host
	}
}
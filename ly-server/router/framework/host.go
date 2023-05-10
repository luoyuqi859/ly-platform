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
		hostRouter.POST("status/modify", hostApi.StatusModify)        // 执行主机状态变更
		hostRouter.POST("checkHostPermission", hostApi.CheckHostPermission)   // 检查是否有host权限

	}
	{
		hostRouterWithoutRecord.POST("list", hostApi.GetHostList)
		hostRouterWithoutRecord.POST("getHostByHostID", hostApi.GetHostByHostID)   // 根据hostid获取host
		hostRouterWithoutRecord.POST("getHostByUserID", hostApi.GetHostByUserID)   // 根据用户id获取host
		hostRouterWithoutRecord.POST("getHostStatus", hostApi.GetHostStatus)   // 获取主机状态
	}
}
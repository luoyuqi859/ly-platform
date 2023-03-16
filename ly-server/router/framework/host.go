package framework

import (
	"ly-server/api"

	"github.com/gin-gonic/gin"
)

type HostRouter struct{}

func (r *HostRouter) InitHostRouter(Router *gin.RouterGroup) {
	hostRouter := Router.Group("host").Use()
	hostApi := api.ApiGroupApp.FrameworkApiGroup.HostApi
	{
		hostRouter.POST("register", hostApi.Register)        // 执行主机注册
	}
}
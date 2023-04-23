package system

import (
	"ly-server/api"

	"github.com/gin-gonic/gin"
)

type BaseRouter struct{}

func (s *BaseRouter) InitBaseRouter(Router *gin.RouterGroup) (R gin.IRoutes) {
	baseRouter := Router.Group("base")
	baseApi := api.ApiGroupApp.SystemApiGroup.BaseApi
	{
		baseRouter.POST("login", baseApi.Login)                     // 登录
		baseRouter.POST("register", baseApi.Register)               // 注册账号
		baseRouter.POST("logout", baseApi.Logout)               // 退出
	}
	return baseRouter
}
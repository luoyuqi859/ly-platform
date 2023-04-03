package system

import (
	"ly-server/api"
	"ly-server/middlewares"

	"github.com/gin-gonic/gin"
)

type UserRouter struct{}

func (r *UserRouter) InitUserRouter(Router *gin.RouterGroup) {
	userRouter := Router.Group("user").Use(middlewares.OperationRecord())
	userRouterWithoutRecord := Router.Group("user")
	baseApi := api.ApiGroupApp.SystemApiGroup.BaseApi
	{
		userRouter.POST("changePassword", baseApi.ChangePassword)         // 用户修改密码
		userRouter.DELETE("deleteUser", baseApi.DeleteUser)               // 删除用户
	}
	{
		userRouterWithoutRecord.POST("list", baseApi.GetUserList) // 分页获取用户列表
		userRouterWithoutRecord.GET("info", baseApi.GetUserInfo)  // 获取自身信息
		userRouterWithoutRecord.POST("getUserInfoById", baseApi.GetUserInfoById)   // 根据id获取用户信息
	}
}
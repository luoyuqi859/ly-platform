package initialize

import (
	"ly-server/global"
	"ly-server/middlewares"
	"ly-server/router"
	"net/http"

	"github.com/gin-gonic/gin"
)

func Routers() *gin.Engine {
	Router := gin.Default()
	systemRouter :=router.RouterGroupApp.System
	frameworkRouter := router.RouterGroupApp.Framework
	// 注册zap相关中间件
	Router.Use(middlewares.GinLogger(), middlewares.GinRecovery(true))
	// 设置跨域中间件
	Router.Use(middlewares.Cors())
	// 路由分组
	PublicGroup := Router.Group(global.CONFIG.System.RouterPrefix)
	{
		// 健康监测
		PublicGroup.GET("/ping", func(c *gin.Context) {
			c.JSON(http.StatusOK, "pong")
		})
	}

	PrivateGroup := Router.Group(global.CONFIG.System.RouterPrefix)
	{
		systemRouter.InitUserRouter(PrivateGroup) // 注册用户路由
		frameworkRouter.InitDeviceRouter(PrivateGroup) //设备路由
		frameworkRouter.InitHostRouter(PrivateGroup) //执行主机路由
	}

	//路由分组
	global.LOG.Info("router register success")
	return Router
}
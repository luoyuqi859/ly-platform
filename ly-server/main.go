package main

import (
	"ly-server/core"
	"ly-server/global"
	"ly-server/initialize"

	"go.uber.org/zap"
)

func main() {
	global.VP = core.Viper() // 初始化Viper
	global.LOG = core.Zap() // 初始化zap日志库
	zap.ReplaceGlobals(global.LOG)
	global.DB = initialize.Gorm() // gorm连接数据库
	if global.DB != nil {
		initialize.RegisterTables(global.DB) // 初始化表
		// 程序结束前关闭数据库链接
		db, _ := global.DB.DB()
		defer db.Close()
	}
	core.RunServer()

}
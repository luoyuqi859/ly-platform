package initialize

import (
	"ly-server/global"
	"ly-server/model/system"
	"os"

	"go.uber.org/zap"
	"gorm.io/gorm"
)

// Gorm 初始化数据库并产生数据库全局变量
// Author SliverHorn
func Gorm() *gorm.DB {
	return GormMysql()
}



// RegisterTables 注册数据库表专用
// Author SliverHorn
func RegisterTables(db *gorm.DB) {
	err := db.AutoMigrate(
		// 系统模块表
		system.SysUser{},
		system.SysBaseMenu{},
		system.SysAuthority{},
		system.SysBaseMenuParameter{},
		system.SysBaseMenuBtn{},




		// 自动化模块表
		// Code generated by github.com/flipped-aurora/gin-vue-admin/server Begin; DO NOT EDIT.

		// Code generated by github.com/flipped-aurora/gin-vue-admin/server End; DO NOT EDIT.
	)
	if err != nil {
		global.LOG.Error("register table failed", zap.Error(err))
		os.Exit(0)
	}
	global.LOG.Info("register table success")
}

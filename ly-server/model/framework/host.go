package framework

import (
	"ly-server/global"

	uuid "github.com/satori/go.uuid"
)

type Host struct {
	global.MODEL
	UUID     uuid.UUID `json:"uuid" gorm:"index;comment:执行主机 UUID"`
	Name     string    `json:"name" gorm:"index;comment:执行主机名称"`
	Ip       string    `json:"ip"  gorm:"comment:执行主机ip"`
	Port     string    `json:"port"  gorm:"comment:执行主机port"`
	Category string    `json:"category"  gorm:"default:private;comment:执行主机类型 private public"`
	Platform string    `json:"platform"  gorm:"comment:平台"`
	Repo     string    `json:"repo"  gorm:"comment:仓库"`
	Owner    uint      `json:"owner"  gorm:"comment:用户ID"`
}

func (Host) TableName() string {
	return "host"
}

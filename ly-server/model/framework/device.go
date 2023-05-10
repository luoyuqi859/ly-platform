package framework

import (
	"ly-server/global"

	uuid "github.com/satori/go.uuid"
)

type Device struct {
	global.MODEL
	UUID            uuid.UUID `json:"uuid" gorm:"index;comment:设备UUID"`
	Name            string    `json:"name" gorm:"index;comment:设备名称"`
	Serial          string    `json:"serial"  gorm:"comment:设备序列号"`
	Brand           string    `json:"brand"  gorm:"comment:设备品牌"`
	Model           string    `json:"model"  gorm:"comment:设备型号"`
	Platform        string    `json:"platform"  gorm:"default:android;comment:平台类型 android ios web"`
	PlatformVersion string    `json:"platformVersion"  gorm:"comment:平台版本"`
	Status          string    `json:"status"  gorm:"default:idle;comment:设备状态 idle offline occupied"`
	Owner           uint      `json:"owner"  gorm:"comment:用户ID"`
	Host            uint      `json:"host"  gorm:"comment:主机ID"`
}

func (Device) TableName() string {
	return "devices"
}

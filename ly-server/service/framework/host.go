package framework

import (
	"errors"
	"ly-server/global"
	"ly-server/model/framework"

	uuid "github.com/satori/go.uuid"
	"gorm.io/gorm"
)

type HostService struct{}

func (HostService *HostService) Register(d framework.Host) (DeviceInter framework.Host, err error) {
	var host framework.Host
	if !errors.Is(global.DB.Where("name = ?", d.Name).First(&host).Error, gorm.ErrRecordNotFound) {
		return DeviceInter, errors.New("设备已注册")
	}
	d.UUID = uuid.NewV4()
	err = global.DB.Create(&d).Error
	return d, err
}
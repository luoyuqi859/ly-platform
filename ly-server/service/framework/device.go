package framework

import (
	"errors"
	"ly-server/global"
	"ly-server/model/framework"
	uuid "github.com/satori/go.uuid"
	"gorm.io/gorm"
)

type DeviceService struct{}

func (DeviceService *DeviceService) Register(d framework.Device) (DeviceInter framework.Device, err error) {
	var device framework.Device
	if !errors.Is(global.DB.Where("name = ?", d.Name).First(&device).Error, gorm.ErrRecordNotFound) { 
		return DeviceInter, errors.New("设备已注册")
	}
	d.UUID = uuid.NewV4()
	err = global.DB.Create(&d).Error
	return d, err
}
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
	if !errors.Is(global.DB.Where("ip = ? AND port = ?", d.Ip, d.Port).First(&host).Error, gorm.ErrRecordNotFound) {
		return host, nil
	}
	d.UUID = uuid.NewV4()
	err = global.DB.Create(&d).Error
	return d, err
}

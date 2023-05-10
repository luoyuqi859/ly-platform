package framework

import (
	"errors"
	"ly-server/global"
	"ly-server/model/common/request"
	"ly-server/model/framework"

	uuid "github.com/satori/go.uuid"
	"gorm.io/gorm"
)

type DeviceService struct{}

func (DeviceService *DeviceService) Register(d framework.Device) (DeviceInter framework.Device, err error) {
	var device framework.Device
	if !errors.Is(global.DB.Where("serial = ?", d.Serial).First(&device).Error, gorm.ErrRecordNotFound) { 
		device.Owner = d.Owner
		device.Host = d.Host
		err = global.DB.Save(&device).Error
		return device, err
	}
	d.UUID = uuid.NewV4()
	err = global.DB.Create(&d).Error
	return d, err
}

func (deviceService *DeviceService) GetDeviceList(info request.PageInfo) (list interface{}, total int64, err error) {
	limit := info.PageSize
	offset := info.PageSize * (info.Page - 1)
	db := global.DB.Model(&framework.Device{})
	var deviceList []framework.Device
	err = db.Count(&total).Error
	if err != nil {
		return
	}
	err = db.Limit(limit).Offset(offset).Find(&deviceList).Error
	return deviceList, total, err
}


//@description: 通过用户ID获取所属设备
func (deviceService *DeviceService) GetDevicesByUserID(id int) ([]framework.Device, error) {
	var devices []framework.Device
	err := global.DB.Where("owner = ?", id).Find(&devices).Error
	return devices, err
}


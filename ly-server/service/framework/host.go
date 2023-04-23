package framework

import (
	"errors"
	"ly-server/global"
	"ly-server/model/common/request"
	"ly-server/model/framework"

	uuid "github.com/satori/go.uuid"
	"gorm.io/gorm"
)

type HostService struct{}

func (HostService *HostService) Register(d framework.Host) (HostInter framework.Host, err error) {
	var host framework.Host
	if !errors.Is(global.DB.Where("ip = ? AND port = ?", d.Ip, d.Port).First(&host).Error, gorm.ErrRecordNotFound) {
		host.Name = d.Name
		host.Category = d.Category
		host.Repo = d.Repo
		host.Owner = d.Owner
		host.Status = d.Status
		err = global.DB.Save(&host).Error
		return host, err
	}
	d.UUID = uuid.NewV4()
	err = global.DB.Create(&d).Error
	return d, err
}

func (HostService *HostService) StatusModify(d framework.Host) (HostInter framework.Host, err error) {
	var host framework.Host
	if !errors.Is(global.DB.Where("ip = ? AND port = ?", d.Ip, d.Port).First(&host).Error, gorm.ErrRecordNotFound) {
		host.Status = d.Status
		err = global.DB.Save(&host).Error
		return host, err
	}
	d.UUID = uuid.NewV4()
	err = global.DB.Create(&d).Error
	return d, err
}

func (hostService *HostService) GetHostList(info request.PageInfo) (list interface{}, total int64, err error) {
	limit := info.PageSize
	offset := info.PageSize * (info.Page - 1)
	db := global.DB.Model(&framework.Host{})
	var hostList []framework.Host
	err = db.Count(&total).Error
	if err != nil {
		return
	}
	err = db.Limit(limit).Offset(offset).Find(&hostList).Error
	return hostList, total, err
}


//@description: 获取host通过用户Id
func (hostService *HostService) GetHostByUserID(id int) (HostInter framework.Host, err error) {
	var host framework.Host
	err = global.DB.Where("owner = ?", id).First(&host).Error
	return host, err
}

//@description: 获取host状态
func (hostService *HostService) GetHostStatus(ip string, port string) (HostInter framework.Host, err error) {
	var host framework.Host
	err = global.DB.Where("ip = ? AND port = ?", ip, port).First(&host).Error
	return host, err
}

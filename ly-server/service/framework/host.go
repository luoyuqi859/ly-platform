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

func (HostService *HostService) Register(h framework.Host) (framework.Host, error) {
	var host framework.Host
	err := global.DB.Where("ip = ? AND port = ?", h.Ip, h.Port).First(&host).Error
	if errors.Is(err, gorm.ErrRecordNotFound) { // 如果当前主机不存在，则创建新主机记录
		h.UUID = uuid.NewV4()
		err = global.DB.Create(&h).Error
		if err != nil {
			return h, err
		}
	} else { // 如果当前主机已存在，则更新该主机信息
		host.Name = h.Name
		host.Category = h.Category
		host.Repo = h.Repo
		host.Owner = h.Owner
		host.Status = h.Status
		err = global.DB.Save(&host).Error

		if err != nil {
			return h, err
		}

		h = host // 将返回值设置为更新后的主机信息
	}

	return h, nil
}

func (HostService *HostService) CheckHostPermission(userID uint, hostID uint) bool {
	var host framework.Host
	if err := global.DB.First(&host, "id = ?", hostID).Error; err != nil {
		return false
	}
	if !host.HasAccess(userID) {
		return false
	}
	return true
}

func (HostService *HostService) CreateOrUpdateHostPermission(h framework.HostPermission) (framework.HostPermission, error) {
	// 查找主机操作权限记录
	var hostPermission framework.HostPermission
	err := global.DB.Where("host_id = ? AND user_id = ?", h.HostID, h.UserID).First(&hostPermission).Error

	// 如果找到记录，则更新它
	if err == nil {
		hostPermission.Approved = h.Approved
		err = global.DB.Save(&hostPermission).Error
		if err != nil {
			return hostPermission, err
		}
	} else if errors.Is(err, gorm.ErrRecordNotFound) {
		// 如果没找到记录，则创建新的主机操作权限记录
		err = global.DB.Create(&h).Error
		if err != nil {
			return h, err
		}
		hostPermission = h
	} else {
		// 处理其他错误
		return hostPermission, err
	}

	return hostPermission, nil
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

//@description: 获取host通过用户Id
func (hostService *HostService) GetHostByUserID(id int) (HostInter framework.Host, err error) {
	var host framework.Host
	err = global.DB.Where("owner = ?", id).First(&host).Error
	return host, err
}

//@description: 获取host通过hostId
func (hostService *HostService) GetHostByHostID(id int) (HostInter framework.Host, err error) {
	var host framework.Host
	err = global.DB.Where("id = ?", id).First(&host).Error
	return host, err
}

//@description: 获取host状态
func (hostService *HostService) GetHostStatus(ip string, port string) (HostInter framework.Host, err error) {
	var host framework.Host
	err = global.DB.Where("ip = ? AND port = ?", ip, port).First(&host).Error
	return host, err
}

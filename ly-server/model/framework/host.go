package framework

import (
	"ly-server/global"

	uuid "github.com/satori/go.uuid"
)

type Host struct {
	global.MODEL
	UUID       uuid.UUID `json:"uuid" gorm:"index;comment:执行主机 UUID"`
	Name       string    `json:"name" gorm:"index;comment:执行主机名称"`
	Ip         string    `json:"ip" gorm:"comment:执行主机ip"`
	Port       string    `json:"port" gorm:"comment:执行主机port"`
	Category   string    `json:"category" gorm:"default:private;comment:执行主机类型 private public"`
	Platform   string    `json:"platform" gorm:"comment:平台"`
	Status     string    `json:"status" gorm:"default:在线;comment:主机状态 在线 离线 使用中"`
	Repo       string    `json:"repo" gorm:"comment:仓库"`
	Owner      uint      `json:"owner" gorm:"comment:所有者ID"`
}

func (h *Host) HasAccess(userID uint) bool {
	if h.Category == "public" {
		return true
	}
	if h.Owner == userID {
		return true
	}
	var permission []HostPermission
	if err := global.DB.Where("user_id = ? AND host_id = ? AND approved = ?", userID, h.ID, true).Find(&permission).Error; err != nil {
		return false
	}
	return false
}

func (Host) TableName() string {
	return "host"
}

type HostPermission struct {
	global.MODEL
	UserID   uint `json:"userId" gorm:"comment:用户ID"`
	HostID   uint `json:"hostId" gorm:"comment:主机ID"`
	Approved bool `json:"approved" gorm:"default:false;comment:是否已获得操作权限"`
	Status   int  `json:"status" gorm:"default:0;comment:请求状态 0-未处理，1-已同意，2-已拒绝"`
}

func (HostPermission) TableName() string {
	return "host_permission"
}

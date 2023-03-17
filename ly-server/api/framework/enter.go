package framework

import "ly-server/service"

type ApiGroup struct {
	DeviceApi
	HostApi
}

var (
	hostService  = service.ServiceGroupApp.FrameworkServiceGroup.HostService
	deviceService  = service.ServiceGroupApp.FrameworkServiceGroup.DeviceService
)
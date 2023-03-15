package service

import "ly-server/service/system"

type ServiceGroup struct {
	SystemServiceGroup  system.ServiceGroup
}

var ServiceGroupApp = new(ServiceGroup)
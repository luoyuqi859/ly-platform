package service

import (
	"ly-server/service/framework"
	"ly-server/service/system"
)

type ServiceGroup struct {
	SystemServiceGroup  system.ServiceGroup
	FrameworkServiceGroup framework.ServiceGroup
}

var ServiceGroupApp = new(ServiceGroup)
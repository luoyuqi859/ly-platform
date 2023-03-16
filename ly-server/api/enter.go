package api

import (
	"ly-server/api/system"
	"ly-server/api/framework"
)

type ApiGroup struct {
	SystemApiGroup  system.ApiGroup
	FrameworkApiGroup framework.ApiGroup
}

var ApiGroupApp = new(ApiGroup)
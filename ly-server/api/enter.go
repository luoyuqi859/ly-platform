package api

import "ly-server/api/system"

type ApiGroup struct {
	SystemApiGroup  system.ApiGroup
}

var ApiGroupApp = new(ApiGroup)
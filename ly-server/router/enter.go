package router

import (
	"ly-server/router/framework"
	"ly-server/router/system"
)

type RouterGroup struct {
	System system.RouterGroup
	Framework framework.RouterGroup
}

var RouterGroupApp = new(RouterGroup)
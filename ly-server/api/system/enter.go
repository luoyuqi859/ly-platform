package system

import "ly-server/service"

type ApiGroup struct {
	BaseApi
	AuthorityApi
}

var (
	jwtService              = service.ServiceGroupApp.SystemServiceGroup.JwtService
	userService             = service.ServiceGroupApp.SystemServiceGroup.UserService
)
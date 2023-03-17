package framework

import (
	"ly-server/global"
	"ly-server/model/common/response"
	"ly-server/model/framework"
	frameworkReq "ly-server/model/framework/request"
	frameworkRes "ly-server/model/framework/response"
	"ly-server/utils"

	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

type HostApi struct{}

func (h *HostApi) Register(c *gin.Context) {
	var r frameworkReq.HostRegister
	err := c.ShouldBind(&r)
	if err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}
	err = utils.Verify(r, utils.HostRegisterVerify)
	if err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}
	host := &framework.Host{Name: r.Name, Ip: r.Ip, Port: r.Port, Category: r.Category, Platform: r.Platform, Owner: r.Owner}
	hostReturn, err := hostService.Register(*host)
	if err != nil {
		global.LOG.Error("注册失败!", zap.Error(err))
		response.FailWithDetailed(frameworkRes.HostResponse{Host: hostReturn}, "注册失败", c)
		return
	}
	response.OkWithDetailed(frameworkRes.HostResponse{Host: hostReturn}, "注册成功", c)
}
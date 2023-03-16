package framework

import (
	"ly-server/global"
	"ly-server/model/common/response"
	"ly-server/model/framework"
	frameworkReq "ly-server/model/framework/request"
	frameworkRes "ly-server/model/framework/response"
	"ly-server/service"
	"ly-server/utils"

	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

type DeviceApi struct{}

func (d *DeviceApi) Register(c *gin.Context) {
	var r frameworkReq.DeviceRegister
	err := c.ShouldBind(&r)
	if err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}
	err = utils.Verify(r, utils.DeviceRegisterVerify)
	if err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}
	device := &framework.Device{Name: r.Name, Serial: r.Serial, Brand: r.Brand, Model: r.Model, Platform: r.Platform, PlatformVersion: r.PlatformVersion, Owner: r.Owner}
	deviceReturn, err := service.ServiceGroupApp.FrameworkServiceGroup.DeviceService.Register(*device)
	if err != nil {
		global.LOG.Error("注册失败!", zap.Error(err))
		response.FailWithDetailed(frameworkRes.DeviceResponse{Device: deviceReturn}, "注册失败", c)
		return
	}
	response.OkWithDetailed(frameworkRes.DeviceResponse{Device: deviceReturn}, "注册成功", c)
}

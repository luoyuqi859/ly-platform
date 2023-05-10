package framework

import (
	"ly-server/global"
	"ly-server/model/common/request"
	"ly-server/model/common/response"
	"ly-server/model/framework"
	frameworkReq "ly-server/model/framework/request"
	frameworkRes "ly-server/model/framework/response"
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
	id := utils.GetUserID(c)
	device := &framework.Device{Name: r.Name, Serial: r.Serial, Brand: r.Brand, Model: r.Model, Platform: r.Platform, PlatformVersion: r.PlatformVersion, Owner: id,Host: r.Host}
	deviceReturn, err := deviceService.Register(*device)
	if err != nil {
		global.LOG.Error("注册失败!", zap.Error(err))
		response.FailWithDetailed(frameworkRes.DeviceResponse{Device: deviceReturn}, "注册失败", c)
		return
	}
	response.OkWithDetailed(frameworkRes.DeviceResponse{Device: deviceReturn}, "注册成功", c)
}

func (d *DeviceApi) GetDeviceList(c *gin.Context) {
	var pageInfo request.PageInfo
	err := c.ShouldBind(&pageInfo)
	if err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}
	err = utils.Verify(pageInfo, utils.PageInfoVerify)
	if err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}
	list, total, err := deviceService.GetDeviceList(pageInfo)
	if err != nil {
		global.LOG.Error("获取失败!", zap.Error(err))
		response.FailWithMessage("获取失败", c)
		return
	}
	response.OkWithDetailed(response.PageResult{
		List:     list,
		Total:    total,
		Page:     pageInfo.Page,
		PageSize: pageInfo.PageSize,
	}, "获取成功", c)
}

// @Summary   通过用户ID获取设备列表
func (d *DeviceApi) GetDevicesByUserID(c *gin.Context) {
	var idInfo request.GetById
	err := c.ShouldBind(&idInfo)
	if err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}
	err = utils.Verify(idInfo, utils.IdVerify)
	if err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}
	devices, err := deviceService.GetDevicesByUserID(idInfo.ID)
	if err != nil {
		global.LOG.Error("获取失败!", zap.Error(err))
		response.FailWithMessage("获取失败", c)
		return
	}
	response.OkWithDetailed(gin.H{"deviceList": devices}, "获取成功", c)
}

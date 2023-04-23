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
	id := utils.GetUserID(c)
	host := &framework.Host{Name: r.Name, Ip: r.Ip, Port: r.Port, Category: r.Category, Platform: r.Platform, Repo: r.Repo, Owner: id, Status: r.Status}
	hostReturn, err := hostService.Register(*host)
	if err != nil {
		global.LOG.Error("注册失败!", zap.Error(err))
		response.FailWithDetailed(frameworkRes.HostResponse{Host: hostReturn}, "注册失败", c)
		return
	}
	response.OkWithDetailed(frameworkRes.HostResponse{Host: hostReturn}, "注册成功", c)
}

func (h *HostApi) StatusModify(c *gin.Context) {
	var r frameworkReq.HostRegister
	err := c.ShouldBind(&r)
	if err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}

	id := utils.GetUserID(c)
	host := &framework.Host{Ip: r.Ip, Port: r.Port, Owner: id, Status: r.Status}
	hostReturn, err := hostService.StatusModify(*host)
	if err != nil {
		global.LOG.Error("状态变更失败!", zap.Error(err))
		response.FailWithDetailed(frameworkRes.HostResponse{Host: hostReturn}, "状态变更失败!", c)
		return
	}
	response.OkWithDetailed(frameworkRes.HostResponse{Host: hostReturn}, "执行机状态变更成功", c)
}

func (h *HostApi) GetHostList(c *gin.Context) {
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
	list, total, err := hostService.GetHostList(pageInfo)
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

// @Summary   获取host通过用户id
func (h *HostApi) GetHostByUserID(c *gin.Context) {
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
	ReqHost, err := hostService.GetHostByUserID(idInfo.ID)
	if err != nil {
		global.LOG.Error("获取失败!", zap.Error(err))
		response.FailWithMessage("获取失败", c)
		return
	}
	response.OkWithDetailed(gin.H{"hostInfo": ReqHost}, "获取成功", c)
}

// @Summary   获取host状态
func (h *HostApi) GetHostStatus(c *gin.Context) {
	var r frameworkReq.HostRegister
	err := c.ShouldBind(&r)
	if err != nil {
		response.FailWithMessage(err.Error(), c)
		return
	}
	ReqHost, err := hostService.GetHostStatus(r.Ip, r.Port)
	if err != nil {
		global.LOG.Error("获取失败!", zap.Error(err))
		response.FailWithMessage("获取失败", c)
		return
	}
	response.OkWithDetailed(gin.H{"hostInfo": ReqHost}, "获取成功", c)
}

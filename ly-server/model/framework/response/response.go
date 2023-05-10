package response

import "ly-server/model/framework"

type HostResponse struct {
	Host framework.Host `json:"host"`
}



type DeviceResponse struct {
	Device framework.Device `json:"device"`
}

type HostInfo struct {
    framework.Host
    HasAccessFlag bool `json:"hasAccess"`
}


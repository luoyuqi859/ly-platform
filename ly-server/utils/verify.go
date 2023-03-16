package utils

var (
	RegisterVerify       = Rules{"Username": {NotEmpty()}, "NickName": {NotEmpty()}, "Password": {NotEmpty()}, "AuthorityId": {NotEmpty()}}
	DeviceRegisterVerify = Rules{"Name": {NotEmpty()}, "Serial": {NotEmpty()}, "Brand": {NotEmpty()}, "Model": {NotEmpty()}, "Platform": {NotEmpty()}, "PlatformVersion": {NotEmpty()}, "Owner": {NotEmpty()}}
	HostRegisterVerify   = Rules{"Name": {NotEmpty()}, "Ip": {NotEmpty()}, "Port": {NotEmpty()}, "Model": {NotEmpty()}, "Platform": {NotEmpty()}, "PlatformVersion": {NotEmpty()}, "Owner": {NotEmpty()}}
)

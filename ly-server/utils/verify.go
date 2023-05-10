package utils

var (
	IdVerify             = Rules{"ID": []string{NotEmpty()}}
	RegisterVerify       = Rules{"Username": {NotEmpty()}, "NickName": {NotEmpty()}, "Password": {NotEmpty()}}
	DeviceRegisterVerify = Rules{"Name": {NotEmpty()}, "Serial": {NotEmpty()}, "Brand": {NotEmpty()}, "Model": {NotEmpty()}, "Platform": {NotEmpty()}, "PlatformVersion": {NotEmpty()}, "Host": {NotEmpty()}}
	HostRegisterVerify   = Rules{"Name": {NotEmpty()}, "Ip": {NotEmpty()}, "Port": {NotEmpty()}, "Category": {NotEmpty()}, "Platform": {NotEmpty()}, "Repo": {NotEmpty()}}
	LoginVerify          = Rules{"Username": {NotEmpty()}, "Password": {NotEmpty()}}
	ChangePasswordVerify = Rules{"Password": {NotEmpty()}, "NewPassword": {NotEmpty()}}
	PageInfoVerify       = Rules{"Page": {NotEmpty()}, "PageSize": {NotEmpty()}}
	AuthorityVerify      = Rules{"AuthorityId": {NotEmpty()}, "AuthorityName": {NotEmpty()}}
)

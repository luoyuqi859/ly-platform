package request


type DeviceRegister struct {
	Name            string `json:"name"`
	Serial          string `json:"serial"`
	Brand           string `json:"brand"`
	Model           string `json:"model"`
	Platform        string `json:"platform"`
	PlatformVersion string `json:"platformVersion"`
	Owner           string `json:"owner"`
}

type HostRegister struct{
	Name     string    `json:"name"`
	Ip       string    `json:"ip"`
	Port     string    `json:"port"`
	Category string    `json:"category"`
	Platform string    `json:"platform"`
	Owner    string    `json:"owner"`
}
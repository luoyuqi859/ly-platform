package system

type ServiceGroup struct {
	UserService
	JwtService
	OperationRecordService
	MenuService
	AuthorityService
}
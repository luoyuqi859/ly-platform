package global

import (
	"ly-server/config"

	"github.com/go-redis/redis/v8"
	"github.com/songzhibin97/gkit/cache/local_cache"
	"github.com/spf13/viper"
	"go.uber.org/zap"
	"golang.org/x/sync/singleflight"
	"gorm.io/gorm"
)

var (
	DB                  *gorm.DB
	REDIS               *redis.Client
	LOG                 *zap.Logger
	VP                  *viper.Viper
	CONFIG              config.Server
	Concurrency_Control = &singleflight.Group{}
	BlackCache          local_cache.Cache
)

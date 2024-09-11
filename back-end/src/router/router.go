package router

import (
	"github.com/gin-gonic/gin"
	"github.com/srfreitass/silvio-library-management/back-end/src/controller"
)

func InitRouters(r *gin.RouterGroup) {
	r.POST("/api/v1/auth/register", controller.CreateAccount)
	r.POST("/api/v1/auth/login", controller.CreateAccount)
}
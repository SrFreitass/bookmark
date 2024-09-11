package controller

import (
	"fmt"

	"github.com/gin-gonic/gin"
	dto "github.com/srfreitass/silvio-library-management/back-end/src/dto"
	"github.com/srfreitass/silvio-library-management/back-end/src/infrastructure/db"
	"github.com/srfreitass/silvio-library-management/back-end/src/infrastructure/repositories"
	"github.com/srfreitass/silvio-library-management/back-end/src/services"
)

func CreateAccount(c *gin.Context) {
	var userRequest dto.UserRequest

	if err := c.ShouldBindJSON(&userRequest); err != nil {
		fmt.Println("Erro: Corpo inválido")
	}

	userRepository := repositories.NewUserRepository(db.Db)
	output, err := services.CreateAccountService(userRequest, userRepository)

	if err != nil {
		fmt.Println(err)
		fmt.Println("Eita nóis")
	}

	c.JSON(201, output)
}
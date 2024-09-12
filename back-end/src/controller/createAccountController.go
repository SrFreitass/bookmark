package controller

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/srfreitass/silvio-library-management/back-end/src/config"
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
	
		errorReponse := config.NewErrorResponse(
		400, 
		"Bad Request", 
		"Invalid fields in the request body", 
		[]config.Cause{})

		c.JSON(int(errorReponse.StatusCode), errorReponse)
		return
	}

	response := config.NewReponse(
	201, 
	"Created account", 
	struct { Token string `json:"token"`  } { Token: output })

	c.JSON(int(response.StatusCode), response)
}
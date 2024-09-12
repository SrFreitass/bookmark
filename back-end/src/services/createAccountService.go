package services

import (
	"errors"
	"fmt"

	"github.com/google/uuid"
	"github.com/srfreitass/silvio-library-management/back-end/src/dto"
	models "github.com/srfreitass/silvio-library-management/back-end/src/infrastructure/entities"
	"github.com/srfreitass/silvio-library-management/back-end/src/infrastructure/repositories"
	"golang.org/x/crypto/bcrypt"
)

func CreateAccountService(user dto.UserRequest, repository repositories.UserRepository) (string, error) {
	userExists, err := repository.FindUserByEmail(user.Email)

	if err != nil && err.Error() != "not found user" {
		fmt.Println(err)
		return "", err
	}

	if userExists.Email == user.Email {
		return "", errors.New("e-mail already exists")
	}

	userId, err := uuid.NewRandom()

	if err != nil {
		return "", err
	}

	passwordHashBytes, err := bcrypt.GenerateFromPassword([]byte(user.Password), 10)

	if err != nil {
		return "", errors.New("error password hash")
	}

	tokenJWT, err := createJWT(userId.String(), "STUDENT")

	if err != nil {
		return "", errors.New("error generate jwt")
	}

	err = repository.Create(models.User{
		ID: userId.String(),
		Name: user.Name,
		Username: user.Username,
		Email: user.Email,
		Password: string(passwordHashBytes),
		Role: 0, // STUDENT
		Age: user.Age,
		AvatarURL: "https://github.com/srfreitass.png",
	})

	if err != nil {
		return "", errors.New("there was a problem creating the account")
	}

	return tokenJWT, nil
}
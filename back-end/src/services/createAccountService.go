package services

import (
	"errors"

	"github.com/google/uuid"
	"github.com/srfreitass/silvio-library-management/back-end/src/dto"
	models "github.com/srfreitass/silvio-library-management/back-end/src/infrastructure/entities"
	"github.com/srfreitass/silvio-library-management/back-end/src/infrastructure/repositories"
	"golang.org/x/crypto/bcrypt"
)

func CreateAccountService(user dto.UserRequest, repository repositories.UserRepository) (string, error) {
	userId, err := uuid.NewRandom()

	if err != nil {
		return "", err
	}
	
	// r, _ := regexp.Compile("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}$")

	// matchPassword := r.MatchString(user.Password)

	// if !matchPassword {
	// 	return "", errors.New("password is required Minimum eight characters, at least one uppercase letter, one lowercase letter and one number")
	// }

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
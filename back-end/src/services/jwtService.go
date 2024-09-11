package services

import (
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
)


func createJWT(id string, role string) (string, error) {
	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": id,
		"aud": role,
		"exp": time.Now().Add(time.Hour).Unix(),
		"iat": time.Now().Unix(),
	})

	secretKey := os.Getenv("SECRET_TOKEN_JWT")
	tokenString, err := claims.SignedString([]byte(secretKey))

	if err != nil {
		return "", err
	}

	return tokenString, nil
}
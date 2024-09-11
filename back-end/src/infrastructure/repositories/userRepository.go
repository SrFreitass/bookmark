package repositories

import (
	"database/sql"
	"fmt"

	models "github.com/srfreitass/silvio-library-management/back-end/src/infrastructure/entities"
)

type UserRepository interface {
	Create(user models.User) error
}

type userRepositoryImpl struct {
	db *sql.DB
}

func NewUserRepository(db *sql.DB) userRepositoryImpl {
	return userRepositoryImpl{db: db}
}

func (r userRepositoryImpl) Create(user models.User) error {
	query := `
		INSERT INTO users (id, name, username, email, password, age, avatar_url, role)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
	`
	_, err := r.db.Exec(
		query, user.ID, user.Name, user.Username,user.Email, 
		user.Password, user.Age, user.AvatarURL, user.Role)

	if err != nil {
		fmt.Println(err)
		return err
	}

	return nil
}
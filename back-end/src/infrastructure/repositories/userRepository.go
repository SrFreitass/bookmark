package repositories

import (
	"database/sql"
	"errors"
	"fmt"

	models "github.com/srfreitass/silvio-library-management/back-end/src/infrastructure/entities"
)

type UserRepository interface {
	Create(user models.User) error
	FindUserByEmail(email string) (models.User, error)
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

func (r userRepositoryImpl) FindUserByEmail(email string) (models.User, error) {
	query := "SELECT * FROM users WHERE email = $1"
	
	var user models.User

	rows, err := r.db.Query(query, email)

	
	if err != nil {
		return user, errors.New("error retrieving user")
	}

	defer rows.Close()

	rows.Next()

	if err := rows.Scan(
		&user.ID,
		&user.Email, 
		&user.Password, 
		&user.Name, 
		&user.Username, 
		&user.Age, 
		&user.AvatarURL, 
		&user.Role); err != nil {
		if err == sql.ErrNoRows {
			return user, errors.New("not found user")			
		}

		return user, errors.New("error retrieving user")
	}

	return user, nil
}
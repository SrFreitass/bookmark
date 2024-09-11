package models

const ()

type roles struct {
	DEVELOPER   int
	LIBRARIAN   int
	COORDINATOR int
	TEACHER     int
	STUDENT     int
}

type User struct {
	ID        string `json: "id"`
	Name      string `json: "name`
	Username  string `json: "username"`
	Email     string `json: "email"`
	Password  string `json: "password"`
	Age       uint8  `json: "age"`
	AvatarURL string `json: "avatar_url"`
	Role      uint8  `json: "role"`
}

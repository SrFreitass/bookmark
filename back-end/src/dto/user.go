package dto

type UserRequest struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
	Username string `json:"username"`
	Age      uint8  `json:"age"`
}

type UserResponse struct {
	ID        string `json:"id"`
	Name      string `json:"name"`
	Email     string `json:"email"`
	Age       uint8  `json:"age"`
	AvatarURL string `json:"avatar_url"`
	Role      uint8  `json:"role"`
}
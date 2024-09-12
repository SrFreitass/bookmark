package config

type Response struct {
	StatusCode uint16      `json:"statusCode"`
	Message    string      `json:"message"`
	Data       interface{} `json:"data"`
}

func NewReponse(code uint16, message string, data interface{}) Response {
	return Response{
		StatusCode: code,
		Message:    message,
		Data:       data,
	}
}
package config

type Error struct {
	StatusCode uint16  `json:"statusCode"`
	Message    string  `json:"message"`
	Err        string  `json:"error"`
	Causes     []Cause `json:"causes"`
}

type Cause struct {
	Field   string `json:"field"`
	Message string `json:"message"`
}

func NewErrorResponse(code uint16, message string, err string, causes []Cause) Error {
	return Error{
		StatusCode: code,
		Message:    message,
		Err:        err,
		Causes:     causes,
	}
}
package config

type Error struct {
	Message string  `json: "message"`
	Err     string  `json: "error"`
	Code    uint16  `json: "code"`
	Causes  []Cause `json: "causes"`
}

type Cause struct {
	Field   string `json: "field"`
	Message string `json: "message"`
}
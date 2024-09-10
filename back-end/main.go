package main

import (
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	r := gin.Default()
	err := godotenv.Load();

	if err != nil {
		log.Fatal("Error loading .env file")
	}

	add := os.Getenv("ADDRESS")
	port := os.Getenv("PORT")

	r.Run(add + ":" + port)
}
package main

import (
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/srfreitass/silvio-library-management/back-end/src/router"
)

func main() {
	r := gin.Default()
	err := godotenv.Load();

	if err != nil {
		log.Fatal("Error loading .env file")
	}

	add := os.Getenv("ADDRESS")
	port := os.Getenv("PORT")
	router.InitRouters(&r.RouterGroup)
	
	r.Run(add + ":" + port)
}
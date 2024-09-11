package db

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

type ConnectInfo struct {
	host string
	port string
	user string
	password string
	dbname string
}

func ConnectDB() (*sql.DB) {
	err := godotenv.Load()

	conInfo := ConnectInfo{
		host: os.Getenv("HOST_DB"),
		port: os.Getenv("PORT_DB"),
		user: os.Getenv("USER_DB"),
		password: os.Getenv("PASSWORD_DB"),
		dbname: os.Getenv("NAME_DB"),
	}

	conInfoURL := fmt.Sprintf(
	"host=%s port=%s user=%s password=%s dbname=%s sslmode=disable", 
	conInfo.host, conInfo.port, conInfo.user, conInfo.password, conInfo.dbname)
	
	println(conInfoURL)

	db, err := sql.Open("postgres", conInfoURL)
	
	if err != nil {
		log.Fatal("Error connecting database")
	}
	
	return db
}

var Db = ConnectDB()



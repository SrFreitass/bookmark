package models

import "time"

type Book struct {
	Id                 string
	Isbn               string
	Title              string
	Description        string
	Publisher          string 
	Published_date     time.Time 
	Cover_url          string
	Created_at         time.Time
	Category_id        string
	Quantity           int
	Available_quantity int
}

// func newBook(book Book) *Book {
// 	return &Book{
		
// 	}
// }
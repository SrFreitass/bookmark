CREATE TABLE IF NOT EXISTS "books" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"isbn" varchar(13) NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"author" text NOT NULL,
	"cover_url" text NOT NULL,
	"publisher" text NOT NULL,
	"published_at" date NOT NULL,
	"pages" integer NOT NULL,
	"quantity" smallint NOT NULL,
	"available" smallint NOT NULL,
	"created_at" date NOT NULL,
	"updated_at" date,
	CONSTRAINT "books_isbn_unique" UNIQUE("isbn")
);

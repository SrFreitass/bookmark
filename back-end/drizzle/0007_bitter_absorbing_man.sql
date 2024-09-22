CREATE TABLE IF NOT EXISTS "book_lending" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"book_id" varchar(36) NOT NULL,
	"user_id" varchar(36) NOT NULL,
	"lendend" boolean NOT NULL,
	"created_at" timestamp NOT NULL,
	"status_update_at" timestamp NOT NULL,
	"limit_date" timestamp NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "book_lending" ADD CONSTRAINT "book_lending_book_id_books_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."books"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "book_lending" ADD CONSTRAINT "book_lending_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

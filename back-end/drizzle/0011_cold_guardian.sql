ALTER TABLE "book_lending" RENAME TO "borrow_books";--> statement-breakpoint
ALTER TABLE "borrow_books" DROP CONSTRAINT "book_lending_book_id_books_id_fk";
--> statement-breakpoint
ALTER TABLE "borrow_books" DROP CONSTRAINT "book_lending_user_id_users_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "borrow_books" ADD CONSTRAINT "borrow_books_book_id_books_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."books"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "borrow_books" ADD CONSTRAINT "borrow_books_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

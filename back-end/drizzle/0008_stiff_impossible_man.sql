DO $$ BEGIN
 CREATE TYPE "public"."role" AS ENUM('DEVELOPER', 'ADMIN', 'LIBRARIAN', 'STUDENT');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "role" SET DATA TYPE text;--> statement-breakpoint // Só fé, é o greloo!
ALTER TABLE "users" ALTER COLUMN "role" SET DATA TYPE role USING role::role; --> statement-breakpoint;
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'STUDENT';--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "role" DROP NOT NULL;
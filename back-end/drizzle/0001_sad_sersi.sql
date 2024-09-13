ALTER TABLE "user" ALTER COLUMN "password" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "role" TYPE smallint USING role::smallint;
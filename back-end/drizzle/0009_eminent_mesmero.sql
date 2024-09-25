ALTER TABLE "users" RENAME COLUMN "age" TO "date_birthday";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "date_birthday" SET DATA TYPE text USING date_birthday::text;--> statement-breakpoint // Só fé, é o greloo!
ALTER TABLE "users" ALTER COLUMN "date_birthday" SET DATA TYPE timestamp USING date_birthday::timestamp without time zone;
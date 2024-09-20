ALTER TABLE "books" RENAME COLUMN "author" TO "authors";--> statement-breakpoint
ALTER TABLE "books" ALTER COLUMN "authors" SET DATA TYPE text[];
CREATE TABLE IF NOT EXISTS "user" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"username" varchar(100) NOT NULL,
	"email" text NOT NULL,
	"password" varchar(50) NOT NULL,
	"age" smallint NOT NULL,
	"avatar_url" text NOT NULL,
	"is_verified" boolean NOT NULL,
	"role" text NOT NULL,
	"created_at" timestamp NOT NULL
);

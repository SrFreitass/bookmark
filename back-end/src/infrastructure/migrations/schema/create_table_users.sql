CREATE TABLE users (
    "id" VARCHAR(36) PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "name" VARCHAR(100),
    "username" VARCHAR(100) NOT NULL UNIQUE,
    "age" SMALLINT NOT NULL,
    "avatar_url" TEXT NOT NULL,
    "role" SMALLINT DEFAULT 0 NOT NULL
)
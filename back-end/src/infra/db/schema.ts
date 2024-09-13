
import { boolean, pgTable, smallint, text, timestamp, varchar } from "drizzle-orm/pg-core";

type role = "DEVELOPER" | "LIBRARIAN" | "COORDINATOR" | "TEACHER" | "STUDENT"

const users = pgTable("user", {
    id: varchar("id", { length: 36 }).primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    username: varchar("username", { length: 100}).notNull(),
    email: text("email").notNull(),
    password: varchar("password", { length: 50}).notNull(),
    age: smallint("age").notNull(),
    avatarURL: text("avatar_url").notNull(),
    isVerified: boolean("is_verified").notNull(),
    role: smallint("role").notNull(),
    createdAt: timestamp("created_at").notNull()
})

export { users };


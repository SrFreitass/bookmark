import {
  boolean,
  integer,
  pgTable,
  smallint,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

// type role = 'DEVELOPER' | 'LIBRARIAN' | 'COORDINATOR' | 'TEACHER' | 'STUDENT';

const users = pgTable('user', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  username: varchar('username', { length: 100 }).notNull(),
  email: text('email').notNull(),
  password: text('password').notNull(),
  age: smallint('age').notNull(),
  avatarURL: text('avatar_url').notNull(),
  isVerified: boolean('is_verified').notNull(),
  role: smallint('role').notNull().default(0),
  createdAt: timestamp('created_at').notNull(),
});

const books = pgTable('books', {
  id: varchar('id', { length: 36 }).primaryKey(),
  isbn: varchar('isbn', { length: 13 }).notNull().unique(),
  title: text('title').notNull(),
  description: text('description'),
  authors: text('authors').array().notNull(),
  coverURL: text('cover_url').notNull(),
  publisher: text('publisher').notNull(),
  publishedAt: timestamp('published_at').notNull(),
  pages: integer('pages').notNull(),
  quantity: smallint('quantity').notNull(),
  available: smallint('available').notNull(),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at'),
});

export { books, users };

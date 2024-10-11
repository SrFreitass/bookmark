import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  smallint,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

const roleEnum = pgEnum("role", ["DEVELOPER", "ADMIN", "LIBRARIAN", "STUDENT"])

const users = pgTable('users', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  username: varchar('username', { length: 100 }).notNull(),
  email: text('email').notNull(),
  password: text('password').notNull(),
  birthday: timestamp('date_birthday').notNull(),
  avatarURL: text('avatar_url').notNull(),
  isVerified: boolean('is_verified').notNull(),
  role: roleEnum("role").default("STUDENT").notNull(),
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

const borrowBooks = pgTable('borrow_books', {
  id: varchar('id', { length: 36 }).primaryKey(),
  bookId: varchar('book_id', { length: 36 }).notNull().references(() => books.id),
  userId: varchar('user_id', { length: 36 }).notNull().references(() => users.id),
  borrow: boolean("borrow").notNull(),
  createdAt: timestamp('created_at').notNull(),
  statusUpdateAt: timestamp("status_update_at").notNull(),
  limitDate: timestamp("limit_date").notNull()
});


export { books, borrowBooks, roleEnum, users };


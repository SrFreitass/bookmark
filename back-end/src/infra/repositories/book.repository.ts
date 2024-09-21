import { eq, like, or, sql } from 'drizzle-orm';
import { BookEntity } from '../../core/domains/entities/book.entity';
import { BookRepository } from '../../core/repositories/IBook.repository';
import { db } from '../db/connect';
import { books } from '../db/schema';

class BookRepositoryImpl implements BookRepository {
  constructor(
    private readonly database: typeof db,
    private readonly book: typeof books,
  ) {}

  async deleteBook(id: string, quantity: number): Promise<void> {
    await this.database.update(this.book).set({
      quantity: sql`${this.book.quantity} - ${quantity}`,
      available: sql`${this.book.quantity} - ${quantity}`
    }).where(eq(this.book.id, id))
  }

  async create(book: BookEntity): Promise<void> {
    await this.database.insert(this.book).values({
      ...book,
    });
  }

  async findBook(fields: {
    title?: string;
    isbn?: string;
    id?: string;
  }): Promise<BookEntity | undefined> {
    const book = await this.database.query.books.findFirst({
      where: or(
        eq(this.book.id, fields.id || ''),
        eq(this.book.isbn, fields.isbn || ''),
        like(this.book.title, fields.title || '')
      )
    })

    return book;
  }

  async findBooks(page: number): Promise<BookEntity[]> {
    const books = await this.database.query.books.findMany({
      offset: page * 20 - 20,
      limit: page * 20,
    });

    return books;
  }
}

export { BookRepositoryImpl };

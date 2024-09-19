import { BookEntity } from '../../core/domains/entities/book.entity';
import { BookRepository } from '../../core/repositories/IBook.repository';
import { db } from '../db/connect';
import { books } from '../db/schema';

class BookRepositoryImpl implements BookRepository {
  constructor(
    private readonly database: typeof db,
    private readonly book: typeof books,
  ) {}

  async create(book: BookEntity): Promise<void> {
    await this.database.insert(this.book).values({
      ...book,
    });
  }

  findBook(fields: {
    title?: string;
    isbn?: string;
    id?: string;
  }): Promise<BookEntity | null> {
    throw new Error('Method not implemented.');
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

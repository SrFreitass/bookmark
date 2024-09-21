import { BookEntity } from '../domains/entities/book.entity';

interface BookRepository {
  create(book: BookEntity): Promise<void>;
  findBook(fields: {
    title?: string;
    isbn?: string;
    id?: string;
  }): Promise<BookEntity | undefined>;
  findBooks(page: number): Promise<BookEntity[]>;
  deleteBook(id: string, quantity: number): Promise<void>;
}

export { BookRepository };

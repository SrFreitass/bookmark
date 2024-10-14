import { BookEntity } from '../domains/entities/book.entity';

interface BookRepository {
  countBooks(): Promise<number>;
  create(book: BookEntity): Promise<void>;
  findBook(fields: {
    title?: string;
    isbn?: string;
    id?: string;
  }): Promise<BookEntity[] | undefined>;
  updateBook(id: string, bookEntity: Partial<BookEntity>): Promise<void>;
  findBooks(page: number, categoryId?: string): Promise<BookEntity[]>;
  deleteBook(id: string, quantity: number): Promise<void>;
}

export { BookRepository };


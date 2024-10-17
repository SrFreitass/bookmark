import { BookEntity } from '../domains/entities/book.entity';

interface BookRepository {
  countBooks(filter?: { categoryId?: string, borrow?: boolean, club?: boolean }): Promise<number>;
  create(book: BookEntity): Promise<void>;
  findBook(fields: {
    title?: string;
    isbn?: string;
    id?: string;
  }): Promise<BookEntity[] | undefined>;
  updateBook(id: string, bookEntity: Partial<BookEntity>): Promise<void>;
  findBooks(page: number, filters?: { categoryId?: string, borrow?: boolean, club?: boolean }): Promise<BookEntity[]>;
  deleteBook(id: string, quantity: number): Promise<void>;
}

export { BookRepository };


import { count, eq, like, or, SQL, sql } from "drizzle-orm";
import { BookEntity } from "../../core/domains/entities/book.entity";
import { BookRepository } from "../../core/repositories/IBook.repository";
import { db } from "../db/connect";
import { books, borrowBooks, categories } from "../db/schema";

class BookRepositoryImpl implements BookRepository {
  constructor(
    private readonly database: typeof db,
    private readonly book: typeof books,
  ) {}

  async countBooks(filters?: { categoryId?: string, borrow?: boolean, club?: boolean }): Promise<number> {
    if(filters?.categoryId) {
      const total = await this.database.select({
        total: count(),
      })
      .from(this.book)
      .where(eq(this.book.categoryId, filters.categoryId));

      return total[0].total;
    }

    if(filters?.borrow) {
      const total = await this.database
        .select({
          total: count(),
        })
        .from(this.book)
        .innerJoin(borrowBooks, eq(this.book.id, borrowBooks.bookId));

      return total[0].total;
    }

    if(filters?.club) {
      const total = await this.database
        .select({
          total: count(),
        })
        .from(this.book)
        .where(eq(this.book.club, filters.club));

      return total[0].total;
    }

    const total = await this.database
      .select({
        total: count(),
      })
      .from(this.book);

    return total[0].total;
  }

  async updateBook(id: string, bookEntity: Partial<BookEntity>): Promise<void> {
    await this.database
      .update(this.book)
      .set({
        ...bookEntity,
      })
      .where(eq(this.book.id, id));
  }

  async deleteBook(id: string, quantity: number): Promise<void> {
    await this.database
      .update(this.book)
      .set({
        quantity: sql`${this.book.quantity} - ${quantity}`,
        available: sql`${this.book.quantity} - ${quantity}`,
      })
      .where(eq(this.book.id, id));
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
  }): Promise<BookEntity[] | undefined> {
    const book = await this.database
      .select({
        id: this.book.id,
        title: this.book.title,
        isbn: this.book.isbn,
        description: this.book.description,
        authors: this.book.authors,
        coverURL: this.book.coverURL,
        publisher: this.book.publisher,
        publishedAt: this.book.publishedAt,
        pages: this.book.pages,
        quantity: this.book.quantity,
        available: this.book.available,
        language: this.book.language,
        createdAt: this.book.createdAt,
        updatedAt: this.book.updatedAt,
        categoryId: this.book.categoryId,
        category: categories.name,
      })
      .from(this.book)
      .where(
        or(
          eq(this.book.id, fields.id || ""),
          eq(this.book.isbn, fields.isbn || ""),
          like(this.book.title, fields.title || ""),
        ),
      )
      .innerJoin(categories, eq(this.book.categoryId, categories.id));

    return book;
  }

  async findBooks(page: number, { borrow, categoryId, club }: { categoryId?: string, borrow?: boolean, club?: boolean }): Promise<BookEntity[]> {
    const limit = page * 20;
    const offset = limit - 20;

    if (categoryId) {
      return await this.database.query.books.findMany({
        offset,
        limit,
        where: eq(this.book.categoryId, categoryId),
      });
    }

    if (borrow) {
      return await this.database.select({
        id: this.book.id,
        title: this.book.title,
        isbn: this.book.isbn,
        description: this.book.description,
        authors: this.book.authors,
        coverURL: this.book.coverURL,
        publisher: this.book.publisher,
        publishedAt: this.book.publishedAt,
        pages: this.book.pages,
        quantity: this.book.quantity,
        available: this.book.available,
        createdAt: this.book.createdAt,
        updatedAt: this.book.updatedAt,
        categoryId: this.book.categoryId,
      }).from(this.book)
      .innerJoin(borrowBooks, eq(this.book.id, borrowBooks.bookId))
      .where(eq(borrowBooks.userId, borrowBooks.userId))
      .limit(limit)
      .offset(offset);
    }

    if(club) {
      return await this.database.query.books.findMany({
        offset,
        limit,
        where: eq(this.book.club, club),
      });
    }

    return await this.database.query.books.findMany({
      offset,
      limit,
    });
  }
}

export { BookRepositoryImpl };

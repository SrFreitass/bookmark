import { and, between, count, eq, lte, or } from "drizzle-orm";
import { BorrowBookEntity } from "../../core/domains/entities/borrowBook.entity";
import { BorrowBookRepository } from "../../core/repositories/IBorrowBook.repository";
import { db } from "../db/connect";
import { books, borrowBooks, users } from "../db/schema";

type BorrowBook = typeof borrowBooks;

class BorrowBookRepositoryImpl implements BorrowBookRepository {
    constructor(
        private readonly database: typeof db,
        private readonly borrowBook: BorrowBook
    ) {}
    async countBorrowBooks(filter?: { borrow?: boolean; }): Promise<Number> {
        if (filter?.borrow) {
            const total = await this.database.select({
                total: count()
            }).from(this.borrowBook)
            .where(eq(this.borrowBook.borrow, filter.borrow))

            return total[0].total;
        }

        const total = await this.database.select({
            total: count()
        }).from(this.borrowBook);

        return total[0].total;
    }

    

    async findBorrowBooks({ from, to }: { from: Date; to: Date }): Promise<BorrowBookEntity[]> {
        return await this.database.select({
            id: this.borrowBook.id,
            userId: this.borrowBook.userId,
            bookId: this.borrowBook.bookId,
            bookTitle: books.title,
            userName: users.name,
            limitDate: this.borrowBook.limitDate,
            borrow: this.borrowBook.borrow,
            quantity: this.borrowBook.quantity,
            statusUpdateAt: this.borrowBook.statusUpdateAt,
            createdAt: this.borrowBook.createdAt,
        })
        .from(this.borrowBook)
        .innerJoin(books, eq(this.borrowBook.bookId, books.id))
        .innerJoin(users, eq(this.borrowBook.userId, users.id))
        .where(
            and(
                between(this.borrowBook.limitDate, from, to),
            )
        )
    }

    async findBorrowBook(fields: { userId?: string; bookId?: string; borrow: boolean }): Promise<BorrowBookEntity | null> {
        const borrowBook = await this.database.query.borrowBooks.findFirst({
            where: and(
            eq(borrowBooks.borrow, fields.borrow),
            or(
                eq(borrowBooks.userId, fields.userId || ''),
                eq(borrowBooks.bookId, fields.bookId || '')
            )
            )
        });

        if (!borrowBook) {
            return null;
        }

        return borrowBook;
    }
    
    async create(borrowBook: BorrowBookEntity) {
       await this.database.insert(this.borrowBook).values({ ...borrowBook })
    }
}

export { BorrowBookRepositoryImpl };


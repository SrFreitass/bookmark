import { BorrowBookEntity } from "../domains/entities/borrowBook.entity";
;

interface BorrowBookRepository {
    countBorrowBooks(filter?: { borrow?: boolean }): Promise<Number>;
    create(BorrowBook: BorrowBookEntity): Promise<void>;
    findBorrowBooks({ from, to, userId }: { from: Date, to: Date, userId?: string }): Promise<BorrowBookEntity[]>;
    findBorrowBook(fields: { userId?: string, bookId?: string, borrow?: boolean }): Promise<BorrowBookEntity | null>;
    updateBorrowBook(id: string, fields: { borrow: boolean, updatedAt: Date }): Promise<void>;
}

export { BorrowBookRepository };

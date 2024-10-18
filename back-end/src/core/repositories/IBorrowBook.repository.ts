import { BorrowBookEntity } from "../domains/entities/borrowBook.entity";
;

interface BorrowBookRepository {
    countBorrowBooks(filter?: { borrow?: boolean }): Promise<Number>;
    create(BorrowBook: BorrowBookEntity): Promise<void>; 
    findBorrowBooks({ from, to }: { from: Date, to: Date }): Promise<BorrowBookEntity[]>;
    findBorrowBook(fields: { userId?: string, bookId?: string, borrow?: boolean }): Promise<BorrowBookEntity | null>;
}

export { BorrowBookRepository };




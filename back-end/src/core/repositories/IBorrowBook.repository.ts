import { BorrowBookEntity } from "../domains/entities/borrowBook.entity";
;

interface BorrowBookRepository {
    create(BorrowBook: BorrowBookEntity): Promise<void>; 
    findBorrowBook(fields: { userId?: string, bookId?: string, borrow?: boolean }): Promise<BorrowBookEntity | null>;
}

export { BorrowBookRepository };




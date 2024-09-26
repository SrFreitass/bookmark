import { BorrowBookEntity } from "../domains/entities/borrowBook.entity";
;

interface BorrowBookRepository {
    create(BorrowBook: BorrowBookEntity): Promise<void>; 
}

export { BorrowBookRepository };


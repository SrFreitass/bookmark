import { BorrowBookEntity } from "../domains/entities/BorrowBook.entity";
;

interface BorrowBookRepository {
    create(BorrowBook: BorrowBookEntity): Promise<void>; 
}

export { BorrowBookRepository };


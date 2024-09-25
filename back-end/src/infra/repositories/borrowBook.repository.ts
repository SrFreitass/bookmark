import { BorrowBookEntity } from "../../core/domains/entities/BorrowBook.entity";
import { BorrowBookRepository } from "../../core/repositories/IBorrowBook.repository";
import { db } from "../db/connect";
import { borrowBooks } from "../db/schema";

type BorrowBook = typeof borrowBooks;

class BorrowBookRepositoryImpl implements BorrowBookRepository {
    constructor(
        private readonly database: typeof db,
        private readonly borrowBook: BorrowBook
    ) {}
    
    async create(borrowBook: BorrowBookEntity) {
       await this.database.insert(this.borrowBook).values({ ...borrowBook })
    }
}

export { BorrowBookRepositoryImpl };


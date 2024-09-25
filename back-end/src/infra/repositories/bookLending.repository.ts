import { BookLendingEntity } from "../../core/domains/entities/bookLending.entity";
import { BookLendingRepository } from "../../core/repositories/IBookLending.repository";
import { db } from "../db/connect";
import { bookLending } from "../db/schema";

type bookLending = typeof bookLending

class BookLendingRepositoryImpl implements BookLendingRepository {
    constructor(
        private readonly database: typeof db,
        private readonly bookLending: bookLending
    ) {}
    
    async create(bookLending: BookLendingEntity) {
       await this.database.insert(this.bookLending).values({ ...bookLending })
    }
}

export { BookLendingRepositoryImpl };

import { BookLendingEntity } from "../domains/entities/bookLending.entity";

interface BookLendingRepository {
    create(bookLending: BookLendingEntity): Promise<void>; 
}

export { BookLendingRepository };

import dayjs from "dayjs";

//#TODO book lending entity
class BookLendingEntity {
    readonly id: string;
    readonly book_id: string;
    readonly user_id: string;
    readonly lendend: boolean;
    readonly createdAt: Date;
    readonly statusUpdateAt: Date;
    readonly limitDate: Date;

    constructor({ book_id, lendend, user_id, statusUpdateAt }: Omit<BookLendingEntity, "id" | "createdAt" | "limitDate">) {
        this.id = crypto.randomUUID();
        this.user_id = user_id;
        this.book_id = book_id;
        this.lendend = lendend;
        this.createdAt = new Date();
        this.limitDate = dayjs(this.createdAt).add(14, 'day').toDate();
        this.statusUpdateAt = statusUpdateAt;

    }
}

export { BookLendingEntity };
  
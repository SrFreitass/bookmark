
//#TODO book lending entity
class BorrowBookEntity {
    readonly id: string;
    readonly book_id: string;
    readonly user_id: string;
    readonly lendend: boolean;
    readonly createdAt: Date;
    readonly statusUpdateAt: Date;
    readonly limitDate: Date;

    constructor({ book_id, user_id, limitDate }: Omit<BorrowBookEntity, "id" | "createdAt" | "lendend" | "statusUpdateAt">) {
        this.id = crypto.randomUUID();
        this.user_id = user_id;
        this.book_id = book_id;
        this.lendend = true;
        this.createdAt = new Date();
        this.limitDate = limitDate;
        this.statusUpdateAt = new Date();

    }
}

export { BorrowBookEntity };
  
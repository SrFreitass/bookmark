
//#TODO book lending entity
class BorrowBookEntity {
    readonly id: string;
    readonly bookId: string;
    readonly userId: string;
    readonly borrow: boolean;
    readonly createdAt: Date;
    readonly statusUpdateAt: Date;
    readonly limitDate: Date;

    constructor({ bookId, userId, limitDate }: Omit<BorrowBookEntity, "id" | "createdAt" | "borrow" | "statusUpdateAt">) {
        this.id = crypto.randomUUID();
        this.userId = userId;
        this.bookId = bookId;
        this.borrow = true;
        this.createdAt = new Date();
        this.limitDate = limitDate;
        this.statusUpdateAt = new Date();
    }
}

export { BorrowBookEntity };
  
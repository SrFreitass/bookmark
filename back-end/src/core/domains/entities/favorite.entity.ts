class FavoriteEntity {
    id: string;
    userId: string;
    bookId: string;
    createdAt: Date;
    
    constructor({ userId, bookId }: Omit<FavoriteEntity, "id" | "createdAt">) {
        this.id = crypto.randomUUID();
        this.userId = userId;
        this.bookId = bookId;
        this.createdAt = new Date();
    }
}

export { FavoriteEntity };
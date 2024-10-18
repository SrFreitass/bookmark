import { and, count, eq } from "drizzle-orm";
import { FavoriteEntity } from "../../core/domains/entities/favorite.entity";
import { FavoriteRepository } from "../../core/repositories/IFavorite.repository";
import { db } from "../db/connect";
import { favoritiesBooks } from "../db/schema";

class FavoriteRepositoryImpl implements FavoriteRepository {
    async countFavorite(userId: string): Promise<number> {
        return (await db.select({ total: count() }).from(favoritiesBooks).where(eq(favoritiesBooks.userId, userId)))[0].total;
    }

    async findFavorite(userId: string, bookId: string): Promise<FavoriteEntity[]> {
        return await db.select().from(favoritiesBooks).where(and(eq(favoritiesBooks.userId, userId), eq(favoritiesBooks.bookId, bookId)))
    }
    async addFavorite(favoriteEntity: FavoriteEntity): Promise<void> {
        await db.insert(favoritiesBooks).values(favoriteEntity)
    }

    async removeFavorite(userId: string, bookId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}

export { FavoriteRepositoryImpl };
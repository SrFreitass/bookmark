import { FavoriteEntity } from "../domains/entities/favorite.entity";

interface FavoriteRepository {
    countFavorite(userId: string): Promise<number>;
    addFavorite(favoriteEntity: FavoriteEntity): Promise<void>;
    removeFavorite(userId: string, bookId: string): Promise<void>;
    findFavorite(userId: string, bookId: string): Promise<FavoriteEntity[]>;
}

export { FavoriteRepository };
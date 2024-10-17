import { FavoriteEntity } from "../domains/entities/favorite.entity";

interface FavoriteRepository {
    addFavorite(favoriteEntity: FavoriteEntity): Promise<void>;
    removeFavorite(userId: string, bookId: string): Promise<void>;
}

export { FavoriteRepository };
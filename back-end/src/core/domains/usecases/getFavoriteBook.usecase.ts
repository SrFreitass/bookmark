import { ErrorHandler } from "../../../application/utils/error.handle";
import { FavoriteRepository } from "../../repositories/IFavorite.repository";
import { FavoriteEntity } from "../entities/favorite.entity";

class GetFavoriteBookUseCase {
  constructor(private favoriteRepository: FavoriteRepository) {}

  async execute(userId: string, bookId: string): Promise<FavoriteEntity> {
    if (!userId || !bookId) {
      throw new ErrorHandler("Invalid input");
    }

    const favorite =  await this.favoriteRepository.findFavorite(userId, bookId);

    return favorite[0];
  }
}

export { GetFavoriteBookUseCase };
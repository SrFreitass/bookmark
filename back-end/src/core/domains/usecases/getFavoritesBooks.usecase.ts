import { ErrorHandler } from "../../../application/utils/error.handle";
import { FavoriteRepository } from "../../repositories/IFavorite.repository";
import { FavoriteEntity } from "../entities/favorite.entity";

class GetFavoritesBooksUseCase {
    constructor(private favoriteRepository: FavoriteRepository) {}
  
    async execute(userId: string): Promise<FavoriteEntity[]> {
      if (!userId) {
        throw new ErrorHandler("Invalid input");
      }
  
      const favorites = await this.favoriteRepository.findFavorites(userId);
  
      return favorites;
    }
  }
  
  export { GetFavoritesBooksUseCase };
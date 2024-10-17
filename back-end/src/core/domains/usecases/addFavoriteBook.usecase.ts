import { addFavoriteBookDTO } from "../../../application/dto/favorite.dto";
import { ErrorHandler } from "../../../application/utils/error.handle";
import { BookRepository } from "../../repositories/IBook.repository";
import { FavoriteRepository } from "../../repositories/IFavorite.repository";
import { FavoriteEntity } from "../entities/favorite.entity";

class AddFavoriteBookUseCase {
  constructor(private readonly bookRepository: BookRepository, private readonly favoriteRepository: FavoriteRepository) {}

  async execute({ bookId, userId }: typeof addFavoriteBookDTO.static & { userId: string }): Promise<FavoriteEntity> {
    const book = await this.bookRepository.findBook({ id: bookId });

    if (!book || !book[0]) {
      throw new ErrorHandler('Book not found');
    }

    const favorite = await this.favoriteRepository.findFavorite(userId, bookId);

    if (favorite && favorite[0]) {
      throw new ErrorHandler('Book already favorited');
    }

    const favoriteEntity = new FavoriteEntity({
        userId,
        bookId
    })

    await this.favoriteRepository.addFavorite(favoriteEntity)

    return favoriteEntity;
  }
}

export { AddFavoriteBookUseCase };
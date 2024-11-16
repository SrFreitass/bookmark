import { addFavoriteBookDTO } from "../../../application/dto/favorite.dto";
import { ErrorHandler } from "../../../application/utils/error.handle";
import { BookRepository } from "../../repositories/IBook.repository";
import { FavoriteRepository } from "../../repositories/IFavorite.repository";

class DeleteFavoriteBookUseCase {
  constructor(private readonly bookRepository: BookRepository, private readonly favoriteRepository: FavoriteRepository) {}

  async execute({ bookId, userId }: typeof addFavoriteBookDTO.static & { userId: string }): Promise<void> {
    const book = await this.bookRepository.findBook({ id: bookId });

    if (!book || !book[0]) {
      throw new ErrorHandler('Book not found');
    }

    const favorite = await this.favoriteRepository.findFavorite(userId, bookId);

    if (!favorite) {
      throw new ErrorHandler("Book is't favorited");
    }

    await this.favoriteRepository.removeFavorite(userId, bookId);

    
  }
}

export { DeleteFavoriteBookUseCase };

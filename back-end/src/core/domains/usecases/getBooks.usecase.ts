import { ErrorHandler } from '../../../application/utils/error.handle';
import { BookRepository } from '../../repositories/IBook.repository';

class GetBooksUseCase {
  constructor(private readonly bookRepository: BookRepository) {}

  async execute(page: number, categoryId?: string) {
    if (page <= 0) {
      throw new ErrorHandler('Page must be greater than 0', 400);
    }

    const books = await this.bookRepository.findBooks(page, categoryId);

    return books;
  }
}

export { GetBooksUseCase };

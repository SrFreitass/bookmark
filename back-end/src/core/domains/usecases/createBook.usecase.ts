import { createBookDTO } from "../../../application/dto/book.dto";
import { ErrorHandler } from "../../../application/utils/error.handle";
import { validateISBN } from "../../../application/utils/isbn.validator";
import { BookRepository } from "../../repositories/IBook.repository";
import { BookEntity } from "../entities/book.entity";

class CreateBookUseCase {
  constructor(private readonly bookRepository: BookRepository) {}

  async execute(body: typeof createBookDTO.static) {
    /*
    TODO: FIX
    const checkISBN = validateISBN(body.isbn);

    if (!checkISBN) {
      throw new ErrorHandler('ISBN invalid');
    } */

    if (isNaN(Number(body.publishedAt)))
      throw new ErrorHandler("Invalid publishedAt");

    const bookEntity = new BookEntity({
      isbn: body.isbn,
      title: body.title,
      authors: body.authors,
      description: body.description,
      available: body.available,
      pages: body.pages,
      quantity: body.quantity,
      publisher: body.publisher,
      publishedAt: body.publishedAt,
      coverURL: body.coverURL,
      categoryId: body.categoryId,
    });

    await this.bookRepository.create(bookEntity);
  }
}

export { CreateBookUseCase };

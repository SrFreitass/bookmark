import { editBookDTO } from "../../../application/dto/book.dto";
import { ErrorHandler } from "../../../application/utils/error.handle";
import { BookRepository } from "../../repositories/IBook.repository";

class EditBookUseCase {
  constructor(private readonly bookRepository: BookRepository) {}

  async execute(id: string, body: typeof editBookDTO.static) {
    const book = await this.bookRepository.findBook({ id });

    if (!book || !book[0]) {
      throw new ErrorHandler("Book don't exists");
    }

    const fieldsModifieds: Record<string, string> = {};

    const keys = Object.keys(body);

    keys.forEach((key: string) => {
      if (body[key as keyof typeof body]) {
        const snakeCaseKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
      
        fieldsModifieds[snakeCaseKey] = body[key as keyof typeof body] as string; // todo: fix this
      }
    });

    console.log(fieldsModifieds)
    await this.bookRepository.updateBook(book[0].id, fieldsModifieds);

    return {
      ...book,
      ...fieldsModifieds,
    };
  }
}

export { EditBookUseCase };

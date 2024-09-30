import { editBookDTO } from "../../../application/dto/book.dto";
import { ErrorHandler } from "../../../application/utils/error.handle";
import { BookRepository } from "../../repositories/IBook.repository";

class EditBookUseCase {
    constructor(private readonly bookRepository: BookRepository) {}

    async execute(id: string, body: typeof editBookDTO.static) {
        const book = await this.bookRepository.findBook({ id });

        if (!book?.title) {
            throw new ErrorHandler("Book don't exists");
        }

        const fieldsModifieds: Record<string, string> | typeof body = {};
        
        const keys = Object.keys(body);

        keys.forEach((key: string) => {
            if (body[key as keyof typeof body]) {
                fieldsModifieds[key] = body[key as keyof typeof body] as string;
            }
        });

        await this.bookRepository.updateBook(book.id, fieldsModifieds);

        return {
            ...book,
            ...fieldsModifieds
        };
    }
}

export { EditBookUseCase };


import { ErrorHandler } from "../../../application/utils/error.handle";
import { BookRepository } from "../../repositories/IBook.repository";
import { BookEntity } from "../entities/book.entity";

class GetBookByIdUseCase {
    constructor(private bookRepository: BookRepository) {}
    
    async execute(id: string): Promise<BookEntity | null> {
        if(!id) {
            throw new ErrorHandler("Book id is required");
        }

        const book = await this.bookRepository.findBook({ id })

        if(book) {
            return book[0];
        }
        
        throw new ErrorHandler("Book not found");
    }
}

export { GetBookByIdUseCase }
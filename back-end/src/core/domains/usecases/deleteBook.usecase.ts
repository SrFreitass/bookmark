import { BookRepository } from "../../repositories/IBook.repository";
import { deleteBookDTO } from "../../../application/dto/book.dto";
import { ErrorHandler } from "../../../application/utils/error.handle";

export class DeleteBookUseCase {
    constructor(private readonly bookRepository: BookRepository) {}
    
    async execute({ id, quantity }: typeof deleteBookDTO.static & { id: string }) {
        const book = await this.bookRepository.findBook({ id });
        
        if (!book?.title) {
            throw new ErrorHandler("Book don't exists");
        }

        if (book?.quantity - quantity < 0 || book?.available - quantity < 0) {
            throw new ErrorHandler("Quantity invalid")
        }

        await this.bookRepository.deleteBook(book.id, quantity)
        
        return {
            ...book,
            quantity: book.quantity - quantity,
            available: book.available - quantity
        }
    }   
}
import dayjs from "dayjs";
import { borrowBookDTO } from "../../../application/dto/borrowBook.dto";
import { ErrorHandler } from "../../../application/utils/error.handle";
import { BookRepository } from "../../repositories/IBook.repository";
import { BorrowBookRepository } from "../../repositories/IBorrowBook.repository";
import { BorrowBookEntity } from "../entities/borrowBook.entity";

class BorrowBookUseCase {
    constructor(private readonly borrowBookRepository: BorrowBookRepository, private readonly bookRepository: BookRepository) {}

    async execute(body: typeof borrowBookDTO.static, userId: string) {
       if(body.type != "SHORT" && body.type != "LONG") { 
            throw new ErrorHandler('Invalid borrow type');
       }
    
       const bookExists = await this.bookRepository.findBook({ id: body.bookId });

       if (!bookExists) {
            throw new ErrorHandler('Book not found');
       }

       if (bookExists.available <= 0) {
            throw new ErrorHandler('Book not available');
       }

       const borrowBookEntity = new BorrowBookEntity({
            user_id: userId,
            book_id: body.bookId,
            limitDate: body.type === 'SHORT' ? dayjs().add(1, 'day').toDate() : dayjs().add(14, 'day').toDate(),
       })

       await this.bookRepository.updateBook(body.bookId, { available: bookExists.available - 1 });
       await this.borrowBookRepository.create(borrowBookEntity);

       return {
            message: 'Book borrowed successfully',
       }
       
    }
}

export { BorrowBookUseCase };


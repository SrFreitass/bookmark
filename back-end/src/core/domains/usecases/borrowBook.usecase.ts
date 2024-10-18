import dayjs from "dayjs";
import { borrowBookDTO } from "../../../application/dto/borrowBook.dto";
import { ErrorHandler } from "../../../application/utils/error.handle";
import { BookRepository } from "../../repositories/IBook.repository";
import { BorrowBookRepository } from "../../repositories/IBorrowBook.repository";
import { BorrowBookEntity } from "../entities/borrowBook.entity";

class BorrowBookUseCase {
    constructor(private readonly borrowBookRepository: BorrowBookRepository, private readonly bookRepository: BookRepository) {}

    async execute(body: typeof borrowBookDTO.static) {
       if(body.type != "SHORT" && body.type != "LONG") { 
            throw new ErrorHandler('Invalid borrow type');
       }
    
       const bookExists = await this.bookRepository.findBook({ id: body.bookId, isbn: body.bookId });

       if (!bookExists || !bookExists[0]) {
            throw new ErrorHandler('Book not found');
       }

       const borrowBook = await this.borrowBookRepository.findBorrowBook({ userId: body.userId, borrow: true });

       if (borrowBook) {
          throw new ErrorHandler('User already have a book borrowed');
       }

       if (bookExists[0].available <= 0 || bookExists[0].available < body.quantity) {
            console.log(bookExists[0].available, body.quantity)
            throw new ErrorHandler('Book not available');
       }

       
       const borrowBookEntity = new BorrowBookEntity({
            userId: body.userId,
            bookId: bookExists[0].id,
            limitDate: body.type === 'SHORT' ? dayjs().add(1, 'day').toDate() : dayjs().add(14, 'day').toDate(),
            quantity: body.quantity,
          })


       await this.bookRepository.updateBook(bookExists[0].id, { available: bookExists[0].available - 1 });
       await this.borrowBookRepository.create(borrowBookEntity);

       return {
            message: 'Book borrowed successfully',
       }
       
    }
}

export { BorrowBookUseCase };


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

       const borrowBook = await this.borrowBookRepository.findBorrowBook({ userId, borrow: true });

       if (borrowBook) {
          throw new ErrorHandler('User already have a book borrowed');
       }

       if (bookExists.available <= 0) {
            throw new ErrorHandler('Book not available');
       }

       const borrowBookEntity = new BorrowBookEntity({
            userId: userId,
            bookId: body.bookId,
            limitDate: body.type === 'SHORT' ? dayjs().add(1, 'day').toDate() : dayjs().add(14, 'day').toDate(),
       })
       console.log(borrowBookEntity)
       await this.bookRepository.updateBook(body.bookId, { available: bookExists.available - 1 });
       await this.borrowBookRepository.create(borrowBookEntity);

       return {
            message: 'Book borrowed successfully',
       }
       
    }
}

export { BorrowBookUseCase };


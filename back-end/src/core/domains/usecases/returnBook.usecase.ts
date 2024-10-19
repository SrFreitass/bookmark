import { ErrorHandler } from "../../../application/utils/error.handle";
import { BookRepository } from "../../repositories/IBook.repository";
import { BorrowBookRepository } from "../../repositories/IBorrowBook.repository";
import { UserRepository } from "../../repositories/IUser.repository";

class ReturnBookUseCase {
    constructor(
        private readonly bookRepository: BookRepository, 
        private readonly userRepository: UserRepository, 
        private readonly borrowBookRepository: BorrowBookRepository
    ) {}

    async execute(isbn: string, username: string): Promise<void> {
        const user = await this.userRepository.findUser({ username });

        if (!user) {
            throw new ErrorHandler('User not found');
        }

        const book = await this.bookRepository.findBook({ isbn });

        if (!book) {
            throw new ErrorHandler('Book not found');
        }

        const borrowBook = await this.borrowBookRepository.findBorrowBook(
            { 
                userId: user[0].id, 
                bookId: book[0].id, 
                borrow: true
            }
        );

        if (!borrowBook) {
            throw new ErrorHandler('Book not borrowed');
        }

        await this.bookRepository.updateBook(book[0].id, { available: book[0].available + borrowBook.quantity });
        await this.borrowBookRepository.updateBorrowBook(borrowBook.id, { borrow: false, updatedAt: new Date() });
    }
}

export { ReturnBookUseCase };
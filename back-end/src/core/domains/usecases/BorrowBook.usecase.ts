import { BookRepository } from "../../repositories/IBook.repository";
import { BorrowBookRepository } from "../../repositories/IBorrowBook.repository";

class BorrowBookUseCase {
    constructor(private readonly borrowBookRepository: BorrowBookRepository, private readonly bookRepository: BookRepository) {}

    async execute() {
       
    }
}
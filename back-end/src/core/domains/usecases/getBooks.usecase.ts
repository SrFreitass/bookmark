import { BookRepository } from "../../repositories/IBook.repository";

class GetBooksUseCase {
    constructor(private readonly bookRepository: BookRepository) {}

    async execute(page: number) {
        const books = await this.bookRepository.findBooks(page);
        
        return books;
    }
}

export { GetBooksUseCase };


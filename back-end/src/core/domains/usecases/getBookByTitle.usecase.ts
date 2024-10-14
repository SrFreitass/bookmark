import { BookRepository } from "../../repositories/IBook.repository";

class GetBookByTitleUsecase {
  constructor(private bookRepository: BookRepository) {}

  async execute(title: string) {
    if (!title) {
      throw new Error("Title is required");
    }
    
    title = `%${title}%`;

    const book = await this.bookRepository.findBook({ title });

    return book;
  }
}

export { GetBookByTitleUsecase };
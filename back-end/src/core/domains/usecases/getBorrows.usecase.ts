import { ErrorHandler } from "../../../application/utils/error.handle";
import { BorrowBookRepository } from "../../repositories/IBorrowBook.repository";

class GetBorrowsUseCase {
  constructor(private readonly borrowRepository: BorrowBookRepository) {}

  async execute({ from, to, userId }: { from: string | Date, to: string | Date; userId?: string }){
      from = new Date(from);
      to = new Date(to);

      if(!from || !to || isNaN(from?.getTime()) || isNaN(to?.getTime())) {
          throw new ErrorHandler('Date range is required');
      }

      if(new Date(from) > new Date(to)) {
          throw new ErrorHandler('Invalid date range');
      }

      const books = await this.borrowRepository.findBorrowBooks({ from, to, userId });

      return books;
  }
}

export { GetBorrowsUseCase };

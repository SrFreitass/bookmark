import { ErrorHandler } from "../../../application/utils/error.handle";
import { BorrowBookRepository } from "../../repositories/IBorrowBook.repository";
import { BorrowBookEntity } from "../entities/borrowBook.entity";

class GetBorrowsUseCase {
  constructor(private readonly borrowRepository: BorrowBookRepository) {}

  async execute({ from, to }: { from: string | Date, to: string | Date }){
      from = new Date(from);
      to = new Date(to);

      if(!from || !to || isNaN(from?.getTime()) || isNaN(to?.getTime())) {
          throw new ErrorHandler('Date range is required');
      }
    
      if(new Date(from) > new Date(to)) {
          throw new ErrorHandler('Invalid date range');
      }

      const books = await this.borrowRepository.findBorrowBooks({ from, to });
      const total = await this.borrowRepository.countBorrowBooks({ borrow: true });  

      return [...books, { total }];
  }
}

export { GetBorrowsUseCase };
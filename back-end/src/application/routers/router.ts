import { App } from '../../config/app';
import { AuthController } from '../controllers/auth.controller';
import { BookController } from '../controllers/book.controller';
import { BorrowBookController } from '../controllers/borrowBook.controller';
import { CategoryController } from '../controllers/category.controller';
import { UserController } from '../controllers/user.controller';
import { successResponse } from '../utils/success.response';

export class Router {
  constructor(private readonly server: typeof App) {}

  async execute() {
    this.server.get('/api/v1/health', (cx) => {
      return successResponse(200, [], 'Server is running');
    });

    new AuthController(this.server);
    new BookController(this.server);
    new BorrowBookController(this.server);
    new UserController(this.server);
    new CategoryController(this.server);
  }
}

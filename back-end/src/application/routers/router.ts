import { App } from '../../config/app';
import { AuthController } from '../controllers/auth.controller';
import { BookController } from '../controllers/book.controller';
import { successResponse } from '../utils/success.response';

export class Router {
  constructor(private readonly server: typeof App) {}

  async execute() {
    this.server.get('/api/v1/health', (cx) => {
      return successResponse(200, [], 'Server is running');
    });

    new AuthController(this.server);
    new BookController(this.server);
  }
}

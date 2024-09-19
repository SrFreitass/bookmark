import { App } from '../../config/app';
import { AuthController } from '../controllers/auth.controller';
import { BookController } from '../controllers/book.controller';

export class Router {
  constructor(private readonly server: typeof App) {}

  async execute() {
    new AuthController(this.server);
    new BookController(this.server);
  }
}

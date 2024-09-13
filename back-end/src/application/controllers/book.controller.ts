import { App } from "../../config/app";
import { GetBooksUseCase } from "../../core/domains/usecases/getBooks.usecase";
import { db } from "../../infra/db/connect";
import { books } from "../../infra/db/schema";
import { BookRepositoryImpl } from "../../infra/repositories/book.repository";
import { getBooksDTO } from "../dto/book.dto";
import { errorResponse } from "../utils/error.response";
import { successResponse } from '../utils/success.response';

class BookController {
    constructor(private readonly app: typeof App) {
        this.app.get("/api/v1/books/:page", async (context) => {
            try {
                const usecase = new GetBooksUseCase(new BookRepositoryImpl(db, books));
                const output = await usecase.execute(context.params.page);

                return successResponse(200, output, "Books found");
            } catch(err) {
                return errorResponse(err);
            }
        }, {
            params: getBooksDTO,
            detail: {
                tags: ["Books"],
                description: "Get Books with pagination",
            }
        })
    }
}

export { BookController };


import { App } from "../../config/app";
import { AddFavoriteBookUseCase } from "../../core/domains/usecases/addFavoriteBook.usecase";
import { GetFavoriteBookUseCase } from "../../core/domains/usecases/getFavoriteBook.usecase";
import { db } from "../../infra/db/connect";
import { books } from "../../infra/db/schema";
import { BookRepositoryImpl } from "../../infra/repositories/book.repository";
import { FavoriteRepositoryImpl } from "../../infra/repositories/favorite.repository";
import { addFavoriteBookDTO } from "../dto/favorite.dto";
import { errorResponse } from "../utils/error.response";
import { successResponse } from "../utils/success.response";

class FavoriteController {
    constructor(private readonly app: typeof App) {
        this.app.get("/api/v1/favorite/:bookId", async (context) => {
            try {
                const useCase = new GetFavoriteBookUseCase(new FavoriteRepositoryImpl());
                const output = await useCase.execute(context.params.bookId, context.headers?.userid || '');
                return successResponse(200, output, 'Favorite book found');
            } catch (error) {
                return errorResponse(error);
            }
        });

        this.app.post("/api/v1/favorite", async (context) => {
            try {
                const useCase = new AddFavoriteBookUseCase(new BookRepositoryImpl(db, books), new FavoriteRepositoryImpl());
                const output = await useCase.execute({ ...context.body, userId: context.headers?.userid || '' });
                return successResponse(200, output, 'Added to favorites successfully');
            } catch (error) {
                return errorResponse(error);
            }
        },
        {
            body: addFavoriteBookDTO,
            details: {
                tags: ['Favorites'],
                description: 'Add a book to favorites'
            }
        }
        );
    }
}

export { FavoriteController };
import { App } from "../../config/app";
import { AddFavoriteBookUseCase } from "../../core/domains/usecases/addFavoriteBook.usecase";
import { GetFavoriteBookUseCase } from "../../core/domains/usecases/getFavoriteBook.usecase";
import { GetFavoritesBooksUseCase } from "../../core/domains/usecases/getFavoritesBooks.usecase";
import { db } from "../../infra/db/connect";
import { books } from "../../infra/db/schema";
import { BookRepositoryImpl } from "../../infra/repositories/book.repository";
import { FavoriteRepositoryImpl } from "../../infra/repositories/favorite.repository";
import { addFavoriteBookDTO } from "../dto/favorite.dto";
import routes from "../middleware/protectedRoutes";
import { verifyUserMiddlare } from "../middleware/verifyUser.middleware";
import { errorResponse } from "../utils/error.response";
import { successResponse } from "../utils/success.response";

class FavoriteController {
    constructor(private readonly app: typeof App) {
        this.app.get("/api/v1/favorite/:bookId", async (context) => {
            try {
                const useCase = new GetFavoriteBookUseCase(new FavoriteRepositoryImpl());
                const output = await useCase.execute(context.headers?.userid || '', context.params.bookId);
                return successResponse(200, output, 'Favorite book found');
            } catch (error) {
                return errorResponse(error);
            }
        }, {
            async beforeHandle(context) {
                const err = await verifyUserMiddlare({
                    headers: context.headers,
                    jwt: context.jwt,
                    path: context.path as keyof typeof routes,
                });

                if(err) return errorResponse(err);
            },
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
            async beforeHandle(context) {
                const err = await verifyUserMiddlare({
                    headers: context.headers,
                    jwt: context.jwt,
                    path: context.path as keyof typeof routes,
                });

                if(err) return errorResponse(err);
            },
            body: addFavoriteBookDTO,
            details: {
                tags: ['Favorites'],
                description: 'Add a book to favorites'
            }
        }
        );

        this.app.get("/api/v1/favorites", async (context) => {
            try {
                const useCase = new GetFavoritesBooksUseCase(new FavoriteRepositoryImpl());
                const output = await useCase.execute(context.headers?.userid || '');
                return successResponse(200, output, 'Favorite books found');
            } catch (error) {
                return errorResponse(error);
            }
        }, {
            async beforeHandle(context) {
                const err = await verifyUserMiddlare({
                    headers: context.headers,
                    jwt: context.jwt,
                    path: context.path as keyof typeof routes,
                });

                if(err) return errorResponse(err);
            },
        });
    }
}

export { FavoriteController };

import { error, t } from "elysia";
import { App } from "../../config/app";
import { CreateBookUseCase } from "../../core/domains/usecases/createBook.usecase";
import { DeleteBookUseCase } from "../../core/domains/usecases/deleteBook.usecase";
import { EditBookUseCase } from "../../core/domains/usecases/editBook.usecase";
import { GetBooksUseCase } from "../../core/domains/usecases/getBooks.usecase";
import { db } from "../../infra/db/connect";
import { books } from "../../infra/db/schema";
import { BookRepositoryImpl } from "../../infra/repositories/book.repository";
import {
  createBookDTO,
  deleteBookDTO,
  editBookDTO,
  getBooksDTO,
} from "../dto/book.dto";
import { errorResponse } from "../utils/error.response";
import { successResponse } from "../utils/success.response";
import { GetBookByTitleUsecase } from "../../core/domains/usecases/getBookByTitle.usecase";
import { GetBookByIdUseCase } from "../../core/domains/usecases/getBookById.usecase";

class BookController {
  constructor(private readonly app: typeof App) {
    this.app.delete(
      "/api/v1/book/:id",
      async (context) => {
        try {
          const usecase = new DeleteBookUseCase(
            new BookRepositoryImpl(db, books),
          );
          const output = await usecase.execute({
            id: context.params.id,
            quantity: context.body.quantity,
          });
          return successResponse(
            200,
            output,
            `${context.body.quantity} Books deleted with id ${context.params.id}`,
          );
        } catch (error) {
          return errorResponse(error);
        }
      },
      {
        body: deleteBookDTO,
        detail: {
          tags: ["Books"],
          description: "Delete a book with id",
        },
      },
    );

    this.app.put(
      "/api/v1/book/:id",
      async (context) => {
        try {
          const useCase = new EditBookUseCase(
            new BookRepositoryImpl(db, books),
          );
          const output = await useCase.execute(context.params.id, context.body);
          return successResponse(200, output, "Edited book successfully");
        } catch (error) {
          return errorResponse(error);
        }
      },
      {
        body: editBookDTO,
        detail: {
          tags: ["Books"],
          description: "Edit a book with id",
        },
      },
    );

    this.app.post(
      "/api/v1/book",
      async (context) => {
        try {
          const usecase = new CreateBookUseCase(
            new BookRepositoryImpl(db, books),
          );
          const output = await usecase.execute(context.body);
          return successResponse(201, output, "Book created successfully");
        } catch (error) {
          console.log(context.body, error);
          return errorResponse(error);
        }
      },
      {
        body: createBookDTO,
        error: (err) => {
          return errorResponse(err.error);
        },
        detail: {
          tags: ["Books"],
          description: "Create a book",
        },
      },
    );

    this.app.get("/api/v1/book/:id", async (context) => {
      try {
        const useCase = new GetBookByIdUseCase(
          new BookRepositoryImpl(db, books),
        );
        const output = await useCase.execute(context.params.id || "");
        return successResponse(200, output, "Book found");
      } catch (error) {
        return errorResponse(error);
      }
    });

    this.app.get("/api/v1/book", async (context) => {
      try {
        const useCase = new GetBookByTitleUsecase(
          new BookRepositoryImpl(db, books),
        );
        const output = await useCase.execute(context.query.title || "");
        return successResponse(200, output, "Book found");
      } catch (error) {
        return errorResponse(error);
      }
    });

    this.app.get(
      "/api/v1/books/:page",
      async (context) => {
        try {
          const usecase = new GetBooksUseCase(
            new BookRepositoryImpl(db, books),
          );

          const output = await usecase.execute(
            context.params.page,
            context.query.categoryId,
          );
          return successResponse(200, output, "Books found");
        } catch (err) {
          return errorResponse(err);
        }
      },
      {
        query: t.Optional(
          t.Object({ categoryId: t.String({ format: "uuid" }) }),
        ),
        params: getBooksDTO,
        error: (err) => {
          return errorResponse(err.error);
        },
        detail: {
          tags: ["Books"],
          description: "Get Books with pagination",
        },
      },
    );
  }
}

export { BookController };

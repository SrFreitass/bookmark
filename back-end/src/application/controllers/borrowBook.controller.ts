import { App } from "../../config/app";
import { BorrowBookUseCase } from "../../core/domains/usecases/borrowBook.usecase";
import { db } from "../../infra/db/connect";
import { books, borrowBooks } from "../../infra/db/schema";
import { BookRepositoryImpl } from "../../infra/repositories/book.repository";
import { BorrowBookRepositoryImpl } from "../../infra/repositories/borrowBook.repository";
import { borrowBookDTO } from "../dto/borrowBook.dto";
import { verifyUserMiddlare } from "../middleware/verifyUser.middleware";
import { errorResponse } from "../utils/error.response";
import { successResponse } from "../utils/success.response";

class BorrowBookController {
    constructor(private readonly app: typeof App) {
        this.app.post("/api/v1/borrow", async (context) => {
            try {
                const usecase = new BorrowBookUseCase(
                    new BorrowBookRepositoryImpl(db, borrowBooks), 
                    new BookRepositoryImpl(db, books)
                );
                const ouput = await usecase.execute(context.body, context.headers["userId"] as string);

                return successResponse(201, ouput, 'Book borrowed successfully');
            } catch (error) {
                console.log(error);
                return errorResponse(error);
            }
        }, {
            async beforeHandle(context: any) {
                try {
                    await verifyUserMiddlare(context);
                } catch (error) {
                    return errorResponse(error);
                }
            },
            body: borrowBookDTO,
            detail: {
                tags: ['Borrow Book'],
                description: 'Borrow a book'
            }
        })
    }
}

export { BorrowBookController };


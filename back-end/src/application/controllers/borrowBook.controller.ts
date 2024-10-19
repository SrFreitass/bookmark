import { App } from "../../config/app";
import { BorrowBookUseCase } from "../../core/domains/usecases/borrowBook.usecase";
import { GetBorrowsUseCase } from "../../core/domains/usecases/getBorrows.usecase";
import { ReturnBookUseCase } from "../../core/domains/usecases/returnBook.usecase";
import { db } from "../../infra/db/connect";
import { books, borrowBooks, users } from "../../infra/db/schema";
import { BookRepositoryImpl } from "../../infra/repositories/book.repository";
import { BorrowBookRepositoryImpl } from "../../infra/repositories/borrowBook.repository";
import { UserRepositoryImpl } from "../../infra/repositories/user.repository";
import { borrowBookDTO } from "../dto/borrowBook.dto";
import { returnBookDTO } from "../dto/returnBook.dto";
import { verifyUserMiddlare } from "../middleware/verifyUser.middleware";
import { errorResponse } from "../utils/error.response";
import { successResponse } from "../utils/success.response";

class BorrowBookController {
    constructor(private readonly app: typeof App) {
        this.app.get("/api/v1/borrows", async (context) => {
            try {
                const useCase = new GetBorrowsUseCase(new BorrowBookRepositoryImpl(db, borrowBooks));
                const output = await useCase.execute({ to: context.query.to as string, from: context.query.from as string });
                return successResponse(200, output, 'Borrows retrieved successfully');
            } catch (error) {
                return errorResponse(error);
            }
        });

        this.app.put("/api/v1/borrow/return", async (context) => {
            try {
                const useCase = new ReturnBookUseCase(
                    new BookRepositoryImpl(db, books), 
                    new UserRepositoryImpl(db, users),
                    new BorrowBookRepositoryImpl(db, borrowBooks),
                );
                const output = await useCase.execute(context.body.bookISBN, context.body.userId);
                
                return successResponse(200, output, 'Book returned successfully');
            } catch (error) {
                return errorResponse(error);
            }
        }, {
            body: returnBookDTO
        })

        this.app.post("/api/v1/borrow", async (context) => {
            try {
                const useCase = new BorrowBookUseCase(
                    new BorrowBookRepositoryImpl(db, borrowBooks), 
                    new BookRepositoryImpl(db, books)
                );
                console.log(context.headers)
                const ouput = await useCase.execute(context.body);

                return successResponse(201, ouput, 'Book borrowed successfully');
            } catch (error) {
                console.log(error);
                return errorResponse(error);
            }
        }, {
            async beforeHandle(context: any) {
                try {
                    // await verifyUserMiddlare(context);
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


import { t } from "elysia";
import { App } from "../../config/app";
import { getUserDTO, getUsersDTO } from "../dto/user.dto";
import { errorResponse } from "../utils/error.response";
import { GetUserByIdUseCase } from "../../core/domains/usecases/getUserById.usecase";
import { UserRepositoryImpl } from "../../infra/repositories/user.repository";
import { db } from "../../infra/db/connect";
import { users } from "../../infra/db/schema";
import { successResponse } from "../utils/success.response";
import { BookRepositoryImpl } from "../../infra/repositories/book.repository";


class UserController {
    constructor(private readonly app: typeof App) {
        this.app.get("/api/v1/users/:page", async (context) => {
            try {
               
            } catch (error) {
                return errorResponse(error);
            }
        }, {
            query: t.Optional(t.Object({ pedency: t.Boolean(), borrow: t.Boolean() })),
            params: getUsersDTO,
        })

        this.app.get("/api/v1/user/:id", async (context) => {
            try {
                const useCase = new GetUserByIdUseCase(new UserRepositoryImpl(db, users));
                const output = await useCase.execute(context.params.id);
                return successResponse(200, output, 'User found')
            } catch (error) {
                return errorResponse(error);
            }
        }, {
           params: getUserDTO
        })
    }
}

export { UserController };
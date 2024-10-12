import { t } from "elysia";
import { App } from "../../config/app";
import { getUserDTO } from "../dto/user.dto";
import { errorResponse } from "../utils/error.response";
import { GetUserByIdUseCase } from "../../core/domains/usecases/getUserById.usecase";
import { UserRepositoryImpl } from "../../infra/repositories/user.repository";
import { db } from "../../infra/db/connect";
import { users } from "../../infra/db/schema";
import { successResponse } from "../utils/success.response";


class UserController {
    constructor(private readonly app: typeof App) {
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

export { UserController }
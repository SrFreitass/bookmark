import { App } from "../../config/app";
import { CreateAccountUseCase } from "../../core/domains/usecases/createAccount.usecase";
import { db } from "../../infra/db/connect";
import { users } from "../../infra/db/schema";
import { UserRepositoryImpl } from "../../infra/repositories/user.repository";
import { signUpDTO } from "../dto/user.dto";

class AuthController {
    constructor(private readonly app: typeof App) {

        this.app.post("/api/v1/auth/signup", async (context) => {
            try {
                const usecase = new CreateAccountUseCase(new UserRepositoryImpl(db, users))
                const output = await usecase.execute(context.body, context.jwt)
                
                return {
                    status: 200,
                    message: output.message,
                    tokenAccess: output.token
                }
            } catch (err) {
                if (err instanceof Error) {
                    return {
                        status: 400,
                        message: err.message
                    }
                }
            }
        }, {
            body: signUpDTO,
            detail: {
                tags: ["Auth"],
                description: "Create a new account",
            }
        })

        // this.app.post("/api/v1/auth/signin", (context) => {
        //     const usecase = new CreateAccountUseCase(new UserRepositoryImpl(db, users))
        //     const output = usecase.execute(context.body)
        //     return {
        //         status: 200,
        //         body: output
        //     }
        // }, {
        //     body: signUpDTO
        // })
    }

    
}

export { AuthController };


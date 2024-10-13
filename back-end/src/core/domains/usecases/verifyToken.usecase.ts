import { IJWT } from "../../../@types/interfaces";
import { ErrorHandler } from "../../../application/utils/error.handle";

class VerifyTokenUseCase {
    constructor(private readonly jwt: IJWT) {}

    async execute(token: string) {
        const isValid = await this.jwt.verify(token);

        if(!isValid) {
            throw new ErrorHandler("Token invalid!")
        }

        return true;
    }
}

export { VerifyTokenUseCase };
import { IJWT } from "../../../@types/interfaces";
import { ErrorHandler } from "../../../application/utils/error.handle";
import { UserRepository } from "../../repositories/IUser.repository";

class RefreshTokenUseCase {
    constructor(private readonly userRepository: UserRepository, private readonly jwt: IJWT) {}

    async execute(refreshtoken: string) {
        const isTokenValid = await this.jwt.verify(refreshtoken)
        
        if (!isTokenValid) {
            throw new ErrorHandler("Invalid refresh token", 400)
        }

        const user = await this.userRepository.findUser({ id: isTokenValid.sub })

        if (!user) {
            throw new ErrorHandler("User not found", 400)
        }

        const token = await this.jwt.sign({
            sub: user.id,
            email: user.email,
            role: user.role
        })

        return {
            message: "Token refreshed",
            token
        }
    }
}

export { RefreshTokenUseCase };

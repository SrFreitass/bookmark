import { ErrorHandler } from "../../../application/utils/error.handle";
import { UserRepository } from "../../repositories/IUser.repository";

class GetUserByIdUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(id: string) {
       const user = await this.userRepository.findUser({ id }) || [];

       if(!user[0] || !user) {
            throw new ErrorHandler("User not found!");
       };

       const { email, avatarURL, birthday, name, role, username, isVerified } = user[0];

       return {
            id,
            email,
            avatarURL,
            birthday,
            name,
            role,
            username,
            isVerified
       };
    }
}

export { GetUserByIdUseCase };
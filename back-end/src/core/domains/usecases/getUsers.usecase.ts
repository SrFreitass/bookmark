import { ErrorHandler } from "../../../application/utils/error.handle";
import { UserRepository } from "../../repositories/IUser.repository";

class GetUsersUseCase {
    constructor(private readonly userRepository: UserRepository) {}
    
    async execute({ borrow, pendency, page}: { borrow: boolean, pendency: boolean, page: number }) {
        if(borrow && pendency) {
            throw new ErrorHandler("Borrow and pendency is invalid!")
        }

        return await this.userRepository.findUserWhere({ borrow, pendency, page });
    }
}

export { GetUsersUseCase }
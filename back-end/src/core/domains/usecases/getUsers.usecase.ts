import { ErrorHandler } from "../../../application/utils/error.handle";
import { UserRepository } from "../../repositories/IUser.repository";

class GetUsersUseCase {
    constructor(private readonly userRepository: UserRepository) {}
    
    async execute({ borrow, pendency, page}: { borrow: boolean, pendency: boolean, page: number }) {
        if(borrow && pendency) {
            throw new ErrorHandler("Borrow and pendency is invalid!")
        }

        const total = await this.userRepository.countUsers({ borrow, pendency });
        const users = await this.userRepository.findUsersWhere({ borrow, pendency, page });

        if(!users) {
            return [
                { 
                    total,
                    requestedAt: new Date()
                }
            ]
        }

        return [
            ...users,
            { 
                total,
                requestedAt: new Date()
            }
        ]
    }
}

export { GetUsersUseCase }
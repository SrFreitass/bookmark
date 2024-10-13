import { UserRepository } from "../../repositories/IUser.repository";

class GetUserUseCase {
    constructor(private readonly userRepository: UserRepository) {}
    
    async execute() {
        this.userRepository.findUsers()
    }
}

export { GetUserUseCase }
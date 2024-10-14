import { UserRepository } from "../../repositories/IUser.repository";

// TODO
class GetUserByNameUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async execute() {

    }
}

export { GetUserByNameUseCase }
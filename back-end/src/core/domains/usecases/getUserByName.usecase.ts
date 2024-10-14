import { ErrorHandler } from "../../../application/utils/error.handle";
import { UserRepository } from "../../repositories/IUser.repository";

// TODO
class GetUserByNameUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(name: string) {
        if(!name) throw new ErrorHandler("Name invalid");

        name = `%${name}%`;

        const users = await this.userRepository.findUser({ username: name, name: name });

        console.log(users, "users");

        if(!users || !users[0]) {
            return [];
        }

        return users;
    }
}

export { GetUserByNameUseCase }

import { JWTPayloadSpec } from "@elysiajs/jwt";
import { signUpDTO } from "../../../application/dto/user.dto";
import { UserRepository } from "../../repositories/IUser.repository";
import { UserEntity } from "../entities/user.entity";

interface jwt {
    sign: (morePayload: Record<string, string | number> & JWTPayloadSpec) => Promise<string>;
    verify: (payload: string) => Promise<JWTPayloadSpec | false>;
}

class CreateAccountUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(body: typeof signUpDTO.static, jwt: jwt) {
        const user = this.userRepository.findUser({ email: body.email, username: body.username })
    
        // if (user) {
        //     return {
        //         message: "User already exists"
        //     }
        // }

        body.password = Bun.password.hashSync(body.password, {
            algorithm: 'bcrypt',
            cost: 10
        })

        const newUserEntity = new UserEntity({
            name: body.name,
            username: body.username,
            email: body.email,
            password: body.password,
            age: body.age,
            avatarURL: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
        })

        await this.userRepository.create(newUserEntity);

        const token = await jwt.sign({ sub: newUserEntity.id,  email: newUserEntity.email, role: newUserEntity.role })
        
        return {
            message: "User created",
            token
        }
    }   
}

export { CreateAccountUseCase };


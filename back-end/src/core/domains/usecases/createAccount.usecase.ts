
import { IJWT } from "../../../@types/interfaces";
import { signUpDTO } from "../../../application/dto/auth.dto";
import { ErrorHandler } from "../../../application/utils/error.handle";
import { UserRepository } from "../../repositories/IUser.repository";
import { UserEntity } from "../entities/user.entity";



class CreateAccountUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(body: typeof signUpDTO.static, jwt: IJWT) {
        const user = await this.userRepository.findUser({ email: body.email, username: body.username })
    
    
        if (user?.email === body.email) {
            throw new ErrorHandler("Username already exists", 400)
        }

        if (user?.name === body.name) {
            throw new ErrorHandler("Email already exists", 400)
        }

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
        
        console.log(newUserEntity);

        await this.userRepository.create(newUserEntity);

        const token = await jwt.sign({ sub: newUserEntity.id,  email: newUserEntity.email, role: newUserEntity.role })
        
        return {
            message: "User created",
            token
        }
    }   
}

export { CreateAccountUseCase };


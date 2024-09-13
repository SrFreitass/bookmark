import { UserEntity } from "../domains/entities/user.entity";


interface UserRepository {
    create(user: UserEntity): Promise<void>;
    findUser(fields: { email?: string, username?: string, id?: string }): Promise<UserEntity | null>;
    findUsers(): UserEntity[];
}

export { UserRepository };


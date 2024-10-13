import { UserEntity } from '../domains/entities/user.entity';

interface UserRepository {
  create(user: UserEntity): Promise<void>;
  findUser(fields: {
    email?: string;
    username?: string;
    id?: string;
  }): Promise<UserEntity | null>;
  findUsers(): Promise<UserEntity[]>;
  findUserWhere({ borrow, pendency, page }: { borrow?: boolean, pendency?: boolean, page: number }): Promise<UserEntity[] | null>;
}

export { UserRepository };

import { UserEntity } from '../domains/entities/user.entity';

interface UserRepository {
  countUsers(filter?: { borrow?: boolean, pendency?: boolean }): Promise<Number>;
  create(user: UserEntity): Promise<void>;
  findUser(fields: {
    name?: string;
    email?: string;
    username?: string;
    id?: string;
  }): Promise<UserEntity[] | null>;
  findUsers(): Promise<UserEntity[]>;
  findUsersWhere(
    { borrow, pendency, page }: 
    { borrow?: boolean, pendency?: boolean, page: number }
  ):
   Promise<UserEntity[] | null>;
}

export { UserRepository };

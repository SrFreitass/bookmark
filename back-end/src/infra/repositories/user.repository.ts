import { eq, or } from 'drizzle-orm';
import { UserEntity } from '../../core/domains/entities/user.entity';
import { UserRepository } from '../../core/repositories/IUser.repository';
import { db } from '../db/connect';
import { users } from '../db/schema';

export class UserRepositoryImpl implements UserRepository {
  constructor(
    private readonly database: typeof db,
    private readonly user: typeof users,
  ) {}

  async create(user: UserEntity): Promise<void> {
    await this.database.insert(this.user).values({ ...user });
  }

  async findUser(fields: {
    email?: string;
    username?: string;
    id?: string;
  }): Promise<UserEntity | null> {
    const user = await this.database.query.users.findFirst({
      where: or(
        eq(users.id, fields.id || ''),
        eq(users.email, fields.email || ''),
        eq(users.username, fields.username || ''),
      ),
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async findUsers(): Promise<UserEntity[]> {
    throw new Error('Method not implemented.');
  }
}

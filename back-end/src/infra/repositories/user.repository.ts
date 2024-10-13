import { eq, or, sql } from 'drizzle-orm';
import { UserEntity } from '../../core/domains/entities/user.entity';
import { UserRepository } from '../../core/repositories/IUser.repository';
import { db } from '../db/connect';
import { borrowBooks, users } from '../db/schema';

export class UserRepositoryImpl implements UserRepository {
  constructor(
    private readonly database: typeof db,
    private readonly user: typeof users,
  ) {}

  async findUserWhere({ borrow, pendency, page }: { borrow: boolean; pendency: boolean; page: number }): Promise<UserEntity[] | null> {
    if(borrow) {
      const users =
             await this.database
            .select({
              id: this.user.id,
              name: this.user.name,
              role: this.user.role,
              email: this.user.email,
              createdAt: this.user.createdAt
            })
            .from(this.user)
            .innerJoin(borrowBooks, eq(this.user.id, borrowBooks.userId))
            .where(sql`limit_date < now()`)
            .offset(page * 20 - 20)
            .limit(page * 20)

      return users as UserEntity[];
    }

    if(pendency) {
      const users = 
            await this.database
            .select({
              id: this.user.id,
              name: this.user.name,
              role: this.user.role,
              email: this.user.email,
              createdAt: this.user.createdAt
            })
            .from(this.user)
            .innerJoin(borrowBooks, eq(this.user.id, borrowBooks.userId))
            .offset(page * 20 - 20)
            .limit(page * 20)
        
      return users as UserEntity[];
    }

    return await this.database.query.users.findMany({
      offset: page * 20 - 20,
      limit: page * 20
    })

  }

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

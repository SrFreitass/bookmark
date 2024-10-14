import { count, eq, like, or, sql } from 'drizzle-orm';
import { UserEntity } from '../../core/domains/entities/user.entity';
import { UserRepository } from '../../core/repositories/IUser.repository';
import { db } from '../db/connect';
import { borrowBooks, users } from '../db/schema';

export class UserRepositoryImpl implements UserRepository {
  constructor(
    private readonly database: typeof db,
    private readonly user: typeof users,
  ) {}

  async countUsers(filter?: { borrow?: boolean, pendency?: boolean }): Promise<Number> {
    console.log(filter)

    const usersCountWithFilter = this.database.
    select({ count: count() })
    .from(this.user)
    .innerJoin(borrowBooks, eq(this.user.id, borrowBooks.userId))

    if(filter?.borrow) {
      console.log("1")
      return (await usersCountWithFilter.where(sql`limit_date < now()`))[0].count;
    } 

    if(filter?.pendency) {
      return (await usersCountWithFilter.where(eq(borrowBooks.borrow, true)))[0].count;
    }

    
    return (await this.database.select({ count: count() }).from(this.user))[0].count;
  }

  async findUsersWhere({ borrow, pendency, page }: { borrow: boolean; pendency: boolean; page: number }): Promise<UserEntity[] | null> {
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
    name?: string;
    email?: string;
    username?: string;
    id?: string;
  }): Promise<UserEntity[] | null> {
    const user = await this.database.query.users.findMany({
      where: or(
        like(users.username, fields.username || ''),
        like(users.name, fields.name || ''),
        eq(users.id, fields.id || ''),
        eq(users.email, fields.email || ''),
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

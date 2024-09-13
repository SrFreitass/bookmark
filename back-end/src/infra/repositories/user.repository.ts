import { sql } from "drizzle-orm";
import { UserEntity } from "../../core/domains/entities/user.entity";
import { UserRepository } from "../../core/repositories/IUser.repository";
import { db } from "../db/connect";
import { users } from "../db/schema";

export class UserRepositoryImpl implements UserRepository {

    constructor(private readonly database: typeof db, private readonly user: typeof users) {}

    async create(user: UserEntity): Promise<void> {
        await this.database.insert(this.user).values({ ...user })
    }

    async findUser(fields: { email?: string; username?: string; id?: string; }): Promise<UserEntity | null> {
        const user = await this.database.query.users.findFirst({
            where: sql`email = ${fields.email} OR username = ${fields.username} OR id = ${fields.id}`
        })

        if (!user) {
            return null
        }

        return user;
    }
    findUsers(): UserEntity[] {
        throw new Error("Method not implemented.");
    }

}
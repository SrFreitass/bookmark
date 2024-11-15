import { eq } from "drizzle-orm";
import { RefreshTokenEntity } from "../../core/domains/entities/refreshToken.entity";
import { RefreshTokenRepository } from "../../core/repositories/IRefreshToken.repository";
import { db } from "../db/connect";
import { refreshToken } from "../db/schema";

class RefreshTokenRepositoryImpl implements RefreshTokenRepository {
    async getRefreshToken(userId: string): Promise<RefreshTokenEntity | null> {
        const token = await db.select().from(refreshToken).where(eq(refreshToken.userId, userId));

        if(!token) return null;

        return token[0];
    }

    async refresh(token: RefreshTokenEntity): Promise<void> {
        await db.update(refreshToken).set({
            refreshToken: token.refreshToken,
            expiresAt: token.expiresAt.toString(),
        })
    }
}

export { RefreshTokenRepositoryImpl };

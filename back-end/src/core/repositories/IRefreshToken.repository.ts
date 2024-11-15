import { RefreshTokenEntity } from "../domains/entities/refreshToken.entity";

interface RefreshTokenRepository {
    refresh(token: RefreshTokenEntity): Promise<void>
    getRefreshToken(userId: string): Promise<RefreshTokenEntity | null>
}

export { RefreshTokenRepository };

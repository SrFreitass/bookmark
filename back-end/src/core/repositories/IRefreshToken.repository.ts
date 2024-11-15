import { RefreshTokenEntity } from "../domains/entities/refreshToken.entity";

interface RefreshTokenRepository {
    addRefreshToken(token: RefreshTokenEntity): Promise<void>
    refresh(token: RefreshTokenEntity): Promise<void>
    getRefreshToken(userId: string): Promise<RefreshTokenEntity | null>
}

export { RefreshTokenRepository };

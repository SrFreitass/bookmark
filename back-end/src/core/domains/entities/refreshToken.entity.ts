import dayjs from "dayjs";

class RefreshTokenEntity {
    readonly id: string;
    readonly userId: string;
    readonly refreshToken: string;
    readonly expiresAt: Date;

    constructor({ userId, refreshToken }: Omit<RefreshTokenEntity, 'expiresAt' | 'id'>) {
        this.id = crypto.randomUUID();
        this.userId = userId;
        this.refreshToken = refreshToken;
        // 2 weeks
        this.expiresAt = dayjs().add(14, 'day').toDate()
    };
}

export { RefreshTokenEntity };

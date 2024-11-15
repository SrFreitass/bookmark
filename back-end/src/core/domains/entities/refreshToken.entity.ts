class RefreshTokenEntity {
    readonly userId: string;
    readonly refreshToken: string;
    readonly expiresAt: Date | string;

    constructor({ userId, refreshToken }: Omit<RefreshTokenEntity, 'expireAt'>) {
        this.userId = userId;
        this.refreshToken = refreshToken;
        // 2 weeks
        this.expiresAt = new Date(new Date().getTime() * (1000 * 60 * 60 * 24 * 14));
    };
}

export { RefreshTokenEntity };

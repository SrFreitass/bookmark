import { jwtDecode, JwtPayload } from 'jwt-decode';
import { IJWT } from '../../../@types/interfaces';
import { ErrorHandler } from '../../../application/utils/error.handle';
import { RefreshTokenRepository } from '../../repositories/IRefreshToken.repository';
import { UserRepository } from '../../repositories/IUser.repository';
import { RefreshTokenEntity } from '../entities/refreshToken.entity';

class RefreshTokenUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly jwt: IJWT,
  ) {}

  async execute(refreshToken: string, token: string) {
    const tokenPayload = jwtDecode(token) as JwtPayload;
    console.log(tokenPayload);
    const userId = tokenPayload?.sub || '';

    if (!userId) new ErrorHandler("Invalid token", 400);

    const currentToken = await this.refreshTokenRepository.getRefreshToken(userId);

    if (currentToken?.refreshToken !== refreshToken || currentToken.expiresAt < new Date()) {
      throw new ErrorHandler('Invalid refresh token', 400);
    };


    const user = await this.userRepository.findUser({ id: userId });

    if(!user) {
      throw new ErrorHandler('User not found', 404);
    };


    const newToken = await this.jwt.sign({
      sub: user[0].id,
      email: user[0].email,
      role: user[0].role,
    });

    const newRefreshToken = `${crypto.randomUUID()}-${crypto.randomUUID()}`;

    await this.refreshTokenRepository.refresh(new RefreshTokenEntity({ userId, refreshToken: newRefreshToken }))

    return {
      message: 'Token refreshed',
      token: newToken,
      refreshToken: newRefreshToken
    }

  }
}

export { RefreshTokenUseCase };

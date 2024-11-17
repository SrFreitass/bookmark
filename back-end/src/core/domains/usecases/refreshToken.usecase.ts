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

  async execute(refreshtoken: string) {
    const isTokenValid = await this.jwt.verify(refreshtoken);

    if (!isTokenValid) {
      throw new ErrorHandler('Invalid refresh token', 400);
    }

    const userId = isTokenValid.sub as string;
   
    const currentToken = await this.refreshTokenRepository.getRefreshToken(userId);

    if (currentToken?.refreshToken !== refreshtoken || currentToken.expiresAt < new Date()) {
      throw new ErrorHandler('Invalid refresh token', 400);
    };

    
    const user = await this.userRepository.findUser({ id: userId });

    if(!user) {
      throw new ErrorHandler('User not found', 404);
    };
    

    const token = await this.jwt.sign({
      sub: user[0].id,
      email: user[0].email,
      role: user[0].role,
    });

    const refreshToken = `${crypto.randomUUID()}-${crypto.randomUUID()}`;

    await this.refreshTokenRepository.refresh(new RefreshTokenEntity({ userId, refreshToken }))
    
    return {
      message: 'Token refreshed',
      token,
      refreshToken
    }

  }
}

export { RefreshTokenUseCase };

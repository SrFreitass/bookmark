import { IJWT } from '../../../@types/interfaces';
import { ErrorHandler } from '../../../application/utils/error.handle';
import { UserRepository } from '../../repositories/IUser.repository';

class RefreshTokenUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwt: IJWT,
  ) {}

  async execute(refreshtoken: string) {
    // TODO: adicionar registro no banco de dados do refresh token

    const isTokenValid = await this.jwt.verify(refreshtoken);

    if (!isTokenValid) {
      throw new ErrorHandler('Invalid refresh token', 400);
    }

    const user = await this.userRepository.findUser({ id: isTokenValid.sub });

    if (!user || !user[0]) {
      throw new ErrorHandler('User not found', 400);
    }

    const token = await this.jwt.sign({
      sub: user[0].id,
      email: user[0].email,
      role: user[0].role,
    });

    return {
      message: 'Token refreshed',
      token,
    };
  }
}

export { RefreshTokenUseCase };

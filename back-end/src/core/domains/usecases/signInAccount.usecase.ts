import { IJWT } from '../../../@types/interfaces';
import { signInDTO } from '../../../application/dto/auth.dto';
import { ErrorHandler } from '../../../application/utils/error.handle';
import { RefreshTokenRepository } from '../../repositories/IRefreshToken.repository';
import { UserRepository } from '../../repositories/IUser.repository';
import { RefreshTokenEntity } from '../entities/refreshToken.entity';

class SignInAccount {
  constructor(private readonly userRepository: UserRepository, private readonly refreshToken: RefreshTokenRepository) {}

  async execute(body: typeof signInDTO.static, jwt: IJWT) {
    const user = await this.userRepository.findUser({ studentCode: body.studentCode });

    if (!user || !user[0]) {
      throw new ErrorHandler('Incorrect email or password', 400);
    }

    console.log(user);

    const isPasswordCorrect = Bun.password.verifySync(
      body.password,
      user[0].password,
      'bcrypt',
    );

    console.log(isPasswordCorrect, user[0].password);

    if (!isPasswordCorrect) {
      throw new ErrorHandler('Incorrect email or password', 400);
    }

    const token = await jwt.sign({
      sub: user[0].id,
      email: user[0].email,
      role: user[0].role,
    });

    const refreshToken = `${crypto.randomUUID()}-${crypto.randomUUID()}`;

    await this.refreshToken.refresh(new RefreshTokenEntity({ refreshToken, userId: user[0].id }))

    return {
      refreshToken,
      token
    };
  }
}

export { SignInAccount };


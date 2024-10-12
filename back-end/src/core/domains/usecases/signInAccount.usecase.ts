import dayjs from 'dayjs';
import { IJWT } from '../../../@types/interfaces';
import { signInDTO } from '../../../application/dto/auth.dto';
import { ErrorHandler } from '../../../application/utils/error.handle';
import { UserRepository } from '../../repositories/IUser.repository';

class SignInAccount {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(body: typeof signInDTO.static, jwt: IJWT) {
    const user = await this.userRepository.findUser({ email: body.email });

    if (!user) {
      throw new ErrorHandler('Incorrect email or password', 400);
    }

    const isPasswordCorrect = Bun.password.verifySync(
      body.password,
      user.password,
      'bcrypt',
    );

    if (!isPasswordCorrect) {
      throw new ErrorHandler('Incorrect email or password', 400);
    }

    const token = await jwt.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    const refreshToken = await jwt.sign({
      sub: user.id,
      exp: dayjs().add(7, 'days').unix()
    })

    return {
      refreshToken,
      token
    };
  }
}

export { SignInAccount };

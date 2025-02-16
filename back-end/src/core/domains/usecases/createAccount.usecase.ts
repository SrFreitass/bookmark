import { IJWT } from '../../../@types/interfaces';
import { signUpDTO } from '../../../application/dto/auth.dto';
import { transporter } from '../../../application/utils/email.transporter';
import { ErrorHandler } from '../../../application/utils/error.handle';
import { RefreshTokenRepository } from '../../repositories/IRefreshToken.repository';
import { UserRepository } from '../../repositories/IUser.repository';
import { RefreshTokenEntity } from '../entities/refreshToken.entity';
import { UserEntity } from '../entities/user.entity';

class CreateAccountUseCase {
  constructor(private readonly userRepository: UserRepository, private readonly refreshToken: RefreshTokenRepository) {}

  async execute(body: typeof signUpDTO.static, jwt: IJWT) {
    // ref: this

    const user = await this.userRepository.findUser({
      email: body.email,
      studentCode: body.studentCode,
    });

    console.log(user);

    if (user?.length && user[0].email === body.email) {
      throw new ErrorHandler('Email already exists', 400);
    }

    if (user?.length && user[0].studentCode === body.studentCode) {
      throw new ErrorHandler('Student code already exists', 400);
    }

    const password = `${body.birthday}-${body.name.split(' ')[0]}`;

    const passwordHash = Bun.password.hashSync(password, {
      algorithm: 'bcrypt',
      cost: 10,
    });

    const newUserEntity = new UserEntity({
      studentCode: body.studentCode,
      name: body.name,
      email: body.email,
      password: passwordHash, // default password
      birthday: new Date(body.birthday),
      avatarURL:
        'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
    });

    console.log(newUserEntity);

    await this.userRepository.create(newUserEntity);

    const token = await jwt.sign({
      sub: newUserEntity.id,
      email: newUserEntity.email,
      role: newUserEntity.role,
    });

    const refreshToken = `${crypto.randomUUID()}-${crypto.randomUUID()}`;

    await this.refreshToken.addRefreshToken(new RefreshTokenEntity({ refreshToken, userId: newUserEntity.id }))

    await transporter.sendMail({
      from: 'Bookmark <guilhermefreitasdonascimento67@gmail.com>',
      to: newUserEntity.email,
      subject: 'Sua conta foi criada com sucesso - Bookmark',
      text:
      `Olá ${newUserEntity.name}, sua conta foi criada com sucesso!
      Para acessar o sistema, utilize as seguintes credenciais:
      Seu código de estudante é: ${newUserEntity.studentCode}
      Sua senha é: ${password}`,
    });

    return {
      token,
      refreshToken,
    };
  }
}

export { CreateAccountUseCase };


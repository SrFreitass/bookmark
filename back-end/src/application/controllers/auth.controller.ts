import { App } from '../../config/app';
import { CreateAccountUseCase } from '../../core/domains/usecases/createAccount.usecase';
import { RefreshTokenUseCase } from '../../core/domains/usecases/refreshToken.usecase';
import { SignInAccount } from '../../core/domains/usecases/signInAccount.usecase';
import { db } from '../../infra/db/connect';
import { users } from '../../infra/db/schema';
import { UserRepositoryImpl } from '../../infra/repositories/user.repository';
import { refreshTokenDTO, signInDTO, signUpDTO } from '../dto/auth.dto';
import { errorResponse } from '../utils/error.response';

class AuthController {
  constructor(private readonly app: typeof App) {
    this.app.post(
      '/api/v1/auth/signup',
      async (context) => {
        try {
          const usecase = new CreateAccountUseCase(
            new UserRepositoryImpl(db, users),
          );
          const output = await usecase.execute(context.body, context.jwt);

          return {
            status: 201,
            message: output.message,
            tokenAccess: output.token,
          };
        } catch (err) {
          return errorResponse(err);
        }
      },
      {
        body: signUpDTO,
        error: (err) => {
          return errorResponse(err.error);
        },
        detail: {
          tags: ['Auth'],
          description: 'Create a new account',
        },
      },
    );

    this.app.post(
      '/api/v1/auth/signin',
      async (context) => {
        try {
          const usecase = new SignInAccount(new UserRepositoryImpl(db, users));
          const output = await usecase.execute(context.body, context.jwt);

          return {
            status: 200,
            message: output.message,
            tokenAccess: output.token,
          };
        } catch (err) {
          return errorResponse(err);
        }
      },
      {
        body: signInDTO,
        error: (err) => {
          return errorResponse(err.error);
        },
        detail: {
          tags: ['Auth'],
          description: 'Sign in to your account',
        },
      },
    );

    this.app.post(
      '/api/v1/auth/refreshtoken',
      async (context) => {
        try {
          const usecase = new RefreshTokenUseCase(
            new UserRepositoryImpl(db, users),
            context.jwt,
          );
          const output = await usecase.execute(context.body.refreshToken);

          return {
            status: 200,
            message: output.message,
            tokenAccess: output.token,
          };
        } catch (err) {
          return errorResponse(err);
        }
      },
      {
        body: refreshTokenDTO,
        error: (err) => {
          return errorResponse(err.error);
        },
        detail: {
          tags: ['Auth'],
          description: 'Refresh token',
        },
      },
    );
  }
}

export { AuthController };

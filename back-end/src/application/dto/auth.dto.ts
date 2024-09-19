import { t } from 'elysia';

const signUpDTO = t.Object({
  name: t.String({ minLength: 3, maxLength: 50 }),
  username: t.String({ minLength: 3, maxLength: 50 }),
  email: t.String({ format: 'email' }),
  password: t.String({
    minLength: 8,
    pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
  }),
  age: t.Number({ minimum: 1, maximum: 120 }),
});

const signInDTO = t.Object({
  email: t.String({ format: 'email' }),
  password: t.String({ minLength: 8 }),
});

const refreshTokenDTO = t.Object(
  {
    refreshToken: t.String({
      minLength: 1,
      errorMessage: 'Refresh token is required',
    }),
  },
  { errorMessage: 'Refresh token is required' },
);

export { refreshTokenDTO, signInDTO, signUpDTO };

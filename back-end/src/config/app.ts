import jwt from '@elysiajs/jwt';
import { swagger } from '@elysiajs/swagger';
import { Elysia, t } from 'elysia';
import { Router } from '../application/routers/router';
import { cors } from '@elysiajs/cors'

const App = new Elysia({})
  .use(
    cors({
      origin: '*',
      methods: '*'
    })
  )
  .use(
    swagger({
      version: '0.1.0',
    }),
  )
  .use(
    jwt({
      name: 'jwt',
      secret: process.env.JWT_SECRET || '',
      expiresIn: '1h',
    }),
  );

const router = new Router(App);
router.execute();

App.listen({ port: 8080 }, () => {
  console.log('Server is running on port 8080');
});

export { App };

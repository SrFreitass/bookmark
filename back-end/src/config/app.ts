import { cors } from '@elysiajs/cors';
import jwt from '@elysiajs/jwt';
import staticPlugin from '@elysiajs/static';
import { swagger } from '@elysiajs/swagger';
import { Elysia } from 'elysia';
import { Router } from '../application/routers/router';

const App = new Elysia({})
  .use(staticPlugin({
    assets: './static',
    prefix: '/static'
  }))
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
      exp: '1h'
    }),
  );

const router = new Router(App);
router.execute();

App.listen({ port: 8080 }, () => {
  console.log('Server is running on port 8080');
});

export { App };

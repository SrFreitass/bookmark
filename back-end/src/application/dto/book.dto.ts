import { t } from 'elysia';

const getBooksDTO = t.Object({
  page: t.Number({ minimum: 1 }),
});

const createBookDTO = t.Object({
  isbn: t.String({ minLength: 10, maxLength: 13 }),
  title: t.String({ minLength: 1 }),
  description: t.String(),
  authors: t.Array(t.String({ minLength: 1 })),
  coverURL: t.String({ format: 'uri' }),
  publisher: t.String({ minLength: 1 }),
  publishedAt: t.String({ maxLength: 6, minLength: 6 }),
  pages: t.Number({ minimum: 1, maximum: 10000 }),
  quantity: t.Number({ minimum: 1 }),
  available: t.Number({ minimum: 1 }),
});

export { createBookDTO, getBooksDTO };

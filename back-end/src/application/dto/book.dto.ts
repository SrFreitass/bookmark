import { t } from 'elysia';

const getBooksDTO = t.Object({
  page: t.Number({ minimum: 1 }),
});

const createBookDTO = t.Object({
  isbn: t.String({ minLength: 10, maxLength: 13 }),
  title: t.String({ minLength: 1 }),
  description: t.String(),
  authors: t.Array(t.String({ minLength: 1 })),
  coverURL: t.String({ minLength: 10 }),
  publisher: t.String({ minLength: 1 }),
  publishedAt: t.String({ maxLength: 10, minLength: 10 }),
  pages: t.Number({ minimum: 1, maximum: 10000 }),
  quantity: t.Number({ minimum: 1 }),
  available: t.Number({ minimum: 1 }),
});

const editBookDTO = t.Object({
  isbn: t.MaybeEmpty(t.String({ minLength: 10, maxLength: 13 })),
  title: t.MaybeEmpty(t.String({ minLength: 1 })),
  description: t.MaybeEmpty(t.String()),
  authors: t.MaybeEmpty(t.Array(t.String({ minLength: 1 }))),
  coverURL: t.MaybeEmpty(t.String({ minLength: 10 })),
  publisher: t.MaybeEmpty(t.String({ minLength: 1 })),
  publishedAt: t.MaybeEmpty(t.String({ maxLength: 10, minLength: 10 })),
  pages: t.MaybeEmpty(t.Number({ minimum: 1, maximum: 10000 })),
  quantity: t.MaybeEmpty(t.Number({ minimum: 1 })),
  available: t.MaybeEmpty(t.Number({ minimum: 1 })),
})

const deleteBookDTO = t.Object({
  quantity: t.Number({ minimum: 1 })
})

export { createBookDTO, deleteBookDTO, editBookDTO, getBooksDTO };


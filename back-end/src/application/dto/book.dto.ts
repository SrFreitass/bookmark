import { t } from "elysia";

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
  publishedAt: t.String({ maxLength: 4, minLength: 4 }),
  pages: t.Number({ minimum: 1, maximum: 10000 }),
  quantity: t.Number({ minimum: 1 }),
  available: t.Number({ minimum: 1 }),
  categoryId: t.String({ format: "uuid" }),
});

const editBookDTO = t.Optional(
  t.Object({
    isbn: t.Optional(t.String({ minLength: 10, maxLength: 13 })),
    title: t.Optional(t.String({ minLength: 1 })),
    description: t.Optional(t.String()),
    authors: t.Optional(t.Array(t.String({ minLength: 1 }))),
    coverURL: t.Optional(t.String({ minLength: 10 })),
    publisher: t.Optional(t.String({ minLength: 1 })),
    publishedAt: t.Optional(t.String({ maxLength: 4, minLength: 4 })),
    pages: t.Optional(t.Number({ minimum: 1, maximum: 10000 })),
    quantity: t.Optional(t.Number({ minimum: 1 })),
    available: t.Optional(t.Number({ minimum: 1 })),
    categoryId: t.Optional(t.String({ format: "uuid" })),
  }),
);

const deleteBookDTO = t.Object({
  quantity: t.Number({ minimum: 1 }),
});

export { createBookDTO, deleteBookDTO, editBookDTO, getBooksDTO };

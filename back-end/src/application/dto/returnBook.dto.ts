import { t } from "elysia";

const returnBookDTO = t.Object({
    bookISBN: t.String({ minLength: 10, maxLength: 13 }),
    userId: t.String({ format: 'uuid' })
})

export { returnBookDTO };
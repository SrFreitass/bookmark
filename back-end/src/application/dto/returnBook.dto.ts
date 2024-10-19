import { t } from "elysia";

const returnBookDTO = t.Object({
    bookISBN: t.String({ format: 'uuid' }),
    userId: t.String({ format: 'uuid' })
})

export { returnBookDTO };
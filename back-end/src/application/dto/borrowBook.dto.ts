import { t } from "elysia";

const borrowBookDTO  = t.Object({
    bookId: t.String({ format: 'uuid' }),
    type: t.String({ minLength: 4, maxLength: 5  }),
    quantity: t.Number({ minimum: 1 })
})

export { borrowBookDTO };


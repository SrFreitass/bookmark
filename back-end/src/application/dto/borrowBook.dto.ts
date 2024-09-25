import { t } from "elysia";

const borrowBookDTO  = t.Object({
    bookId: t.String({ format: 'uuid' }),
    type: t.Enum({
        'SHORT': 'SHORT',
        'LONG': 'LONG'
    }),
    quantity: t.Number({ minimum: 1 })
})

export { borrowBookDTO };


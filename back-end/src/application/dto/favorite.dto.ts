import { t } from "elysia";

const addFavoriteBookDTO = t.Object({
    bookId: t.String({ format: 'uuid' }),
})

export { addFavoriteBookDTO };
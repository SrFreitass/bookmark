import { t } from "elysia";

const createCategoryDTO = t.Object({
    name: t.String({ minLength: 3 })
})

export { createCategoryDTO };
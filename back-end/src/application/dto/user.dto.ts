import { t } from "elysia";

const getUserDTO = t.Object({
    id: t.String({ minLength: 36, format: 'uuid' })
})

export { getUserDTO }
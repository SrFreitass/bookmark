import { t } from "elysia";

const getUserDTO = t.Object({
    id: t.String({ minLength: 36, format: 'uuid' })
})

const getUsersDTO = t.Object({
    page: t.Number({ minimum: 1 })
})
export { getUserDTO, getUsersDTO }
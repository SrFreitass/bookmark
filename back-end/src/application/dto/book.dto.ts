import { t } from "elysia";

const getBooksDTO = t.Object({
    page: t.Number({ minimum: 1 }),
})




export { getBooksDTO };


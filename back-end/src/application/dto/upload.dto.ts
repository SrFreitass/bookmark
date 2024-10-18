import { t } from "elysia";

const uploadBookCoverDTO = t.Object({
    name: t.String({ minLength: 1 }),
    coverFile: t.File({
        type: "image/png",
        maxSize: 1024 * 1024 * 5,
    })
})

export { uploadBookCoverDTO };
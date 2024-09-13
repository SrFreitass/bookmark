import { t } from "elysia";

const signUpDTO = 
    t.Object({
        name: t.String({ minLength: 3, maxLength: 50 }),
        username: t.String({ minLength: 3, maxLength: 50 }),
        email: t.String({ format: "email"}),
        password: t.String({ minLength: 8 }),
        age: t.Number({ minimum: 1, maximum: 120 })
    })

export { signUpDTO };


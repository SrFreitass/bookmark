import { client } from "../client";

interface Body {
    username: string;
    name: string;
    birthDay: string;
    email: string;
    password: string;
}

const createAccount = async (body: Body) => {
    try {
        console.log(body);

        const json = await client("POST", "/auth/signup", {
            ...body
        });

        console.log(json);
    } catch (err) {
        console.error(err, 'ALERTA ALERTA');
    }

}

export { createAccount }
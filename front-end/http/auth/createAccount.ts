import { client } from "../client";
import type { HTTPResponse } from "../types/http.response";

interface Body {
    username: string;
    name: string;
    birthday: string;
    email: string;
    password: string;
}

interface Response {
    token: string;
    refreshToken: string;
};

const createAccount = async (body: Body): Promise<HTTPResponse<Response> | null> => {
    try {
        console.log(body);

        const json = await client("POST", "/auth/signup", {
            ...body
        }) as HTTPResponse<Response>;

        return json;
    } catch (err) {
        console.error(err, 'ALERTA ALERTA');
        return null;
    }

}

export { createAccount }
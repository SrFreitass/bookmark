import { client } from "../client";
import type { HTTPResponse } from "../types/http.response";

interface Body {
    email: string;
    password: string;
}

interface Response {
    token: string;
    refreshToken: string;
};

const signInAccount = async (body: Body): Promise<HTTPResponse<Response> | null> => {
    try {
        const json = client("POST", "/auth/signin", {
            ...body
        })

        return json;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export { signInAccount }
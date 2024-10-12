import { client } from "../client";
import type { HTTPResponse } from "../types/http.response";


interface User {
    name: string;
    role: string;
    avatarURL: string;
}

const getUserById = async (id: string): Promise<HTTPResponse<User> | null> => {
    try {
        return await client("GET", `/user/${id}`);
    } catch(err) {
        console.error(err);
        return null;
    }
}

export { getUserById };
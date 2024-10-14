import type { User } from "~/models/IUser";
import { client } from "../client"
import type { HTTPResponse } from "../types/http.response";

const getUserByName = async (name: string): Promise<HTTPResponse<User[]> | null> => {
    try {
        const json = await client("GET", `/user?name=${name}`);
        return json;
    } catch (error) {
        return null;
    }
}

export { getUserByName };
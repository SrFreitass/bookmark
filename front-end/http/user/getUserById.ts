import { client } from "../client"
import type { HTTPResponse } from "../types/http.response";

interface User {

}

const getUserById = async (id: string): Promise<HTTPResponse<User> | null> => {
    try {
        return await client("GET", `/user/${id}`);
    } catch (error) {
        console.error(error);        
        return null;
    }
}

export { getUserById }
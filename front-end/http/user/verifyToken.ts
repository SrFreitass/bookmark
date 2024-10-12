import { client } from "../client"
import type { HTTPResponse } from "../types/http.response";



const verifyToken = async (token: string): Promise<HTTPResponse<[]> | null> => {
    try {
        return await client("POST", `/auth/verify`, {
            token
        });
    } catch (error) {
        console.error(error);        
        return null;
    }
}

export { verifyToken }
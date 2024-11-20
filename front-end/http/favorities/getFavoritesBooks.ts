import { client } from "../client";
import type { HTTPResponse } from "../types/http.response";

const getFavoritesBooks = async (): Promise<HTTPResponse<{
    id: string,
    bookId: string,
    userId: string }[]>
    | null> => {
    try {
        return await client("GET", "/favorites");
    } catch(err) {
        console.error(err);
        return null;
    }
}

export { getFavoritesBooks };

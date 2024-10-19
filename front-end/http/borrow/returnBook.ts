import { client } from "../client";
import type { HTTPResponse } from "../types/http.response";

const returnBook = async (isbn: string, userId: string): Promise<HTTPResponse<null> | null> => {
    try {
        return await client("PUT", "/borrow/return", {
            bookISBN: isbn,
            userId: userId
        });
    } catch (error) {
        console.error(error);
        return null;
    }
}

export { returnBook };
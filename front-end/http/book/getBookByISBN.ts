import type { IBook } from "~/models/IBook";
import type { HTTPResponse } from "../types/http.response";
import { client } from "../client";

const getBookByISBN = async (isbn: string): Promise<HTTPResponse<IBook> | null> => {
    try {
        return await client("GET", `/book/${isbn}`);
    } catch (error) {
        console.error(error);
        return null;
    }
}

export { getBookByISBN };
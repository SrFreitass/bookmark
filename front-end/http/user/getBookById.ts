import type { IBook } from "~/models/IBook";
import { client } from "../client";
import type { HTTPResponse } from "../types/http.response";

const getBookById = async (id: string): Promise<HTTPResponse<IBook> | null> => {
    try {
        return await client("GET", `/book/${id}`);
    } catch (error) {
        console.error(error);
        return null;
    }
}

export { getBookById };
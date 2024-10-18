import type { IBook } from "~/models/IBook";
import type { HTTPResponse } from "../types/http.response";
import { client } from "../client";

const getBooksByCategory = async (category: string): Promise<HTTPResponse<IBook[]> | null> => {
    try {
        return await client("GET", `/books/1?categoryId=${category}`);
    } catch (error) {
        console.error(error);
        return null;
    }
}

export { getBooksByCategory };
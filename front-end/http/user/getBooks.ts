import type { IBook } from "~/models/IBook";
import { client } from "../client"
import type { HTTPResponse } from "../types/http.response";

const getBooks = async (page: number = 1): Promise<HTTPResponse<IBook[] & { total: number }[]> | null> => {
    try {
        const json = await client("GET", `/books/${page}`);
        return json;
    } catch (error) {
        console.error(error);
        return null;
    }

}

export { getBooks };
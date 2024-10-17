import type { IBook } from "~/models/IBook";
import { client } from "../client"
import type { HTTPResponse } from "../types/http.response";

const getBooks = async (page: number = 1, filters?: { categoryId?: string, borrow?: boolean, club?: boolean }): Promise<HTTPResponse<IBook[] &  { total: number }[]> | null> => {
    try {
        const queryParams = new URLSearchParams();

        if (filters?.categoryId) {
            queryParams.append("categoryId", filters.categoryId);
        }
        if (filters?.borrow !== undefined) {
            queryParams.append("borrow", String(filters.borrow));
        }
        if (filters?.club !== undefined) {
            queryParams.append("club", String(filters.club));
        }

        const queryString = queryParams.toString();
        const url = queryString ? `/books/${page}?${queryString}` : `/books/${page}`;

        const json = await client("GET", url);
        return json;
    } catch (error) {
        console.error(error);
        return null;
    }

}

export { getBooks };
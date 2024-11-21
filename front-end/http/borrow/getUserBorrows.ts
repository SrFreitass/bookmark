import dayjs from "dayjs";
import type { IBorrow } from "~/models/IBorrow";
import { client } from "../client";
import type { HTTPResponse } from "../types/http.response";

const getUserBorrows = async (from?: string | Date, to?: string | Date): Promise<HTTPResponse<IBorrow[]> | null>=> {
    try {
        if(!from || !to) {
            from = dayjs(from).date(1).toDate().toISOString();
            to = dayjs(to).date(31).toDate().toISOString();
        }

        return await client("GET", `/borrows/user?from=${from}&to=${to}`);
    } catch (error) {
        console.error(error)
        return null;
    }
}

export { getUserBorrows };

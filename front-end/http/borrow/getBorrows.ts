import dayjs from "dayjs"
import { client } from "../client"
import type { HTTPResponse } from "../types/http.response";
import type { IBorrow } from "~/models/IBorrow";

const getBorrows = async (from?: string | Date, to?: string | Date): Promise<HTTPResponse<IBorrow[]> | null>=> {
    try {
        if(!from || !to) {
            from = dayjs(from).date(1).toDate().toISOString();
            to = dayjs(to).date(31).toDate().toISOString();
        }
    
        return await client("GET", `/borrows?from=${from}&to=${to}`);        
    } catch (error) {
        console.error(error)
        return null;
    }
}

export { getBorrows };
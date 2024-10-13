import type { User } from "~/models/IUser";
import { client } from "../client";
import type { HTTPResponse } from "../types/http.response";


const getUsers = async (page: number, filter?: { borrow?: boolean, pendency?: boolean}): Promise<HTTPResponse<User[]> | null> => {
    try {
        if(filter?.borrow && filter?.pendency) {
            return null;
        }
        
        if(!filter?.borrow && !filter?.pendency) {
            return await client("GET", `/users/${page}`) 
        }

        return await client("GET", `/users/${page}${filter?.borrow ? '?borrow=1' : '?pendency=1' }`)
    } catch (error) {
        console.error(error);
        return null;
    }


}

export { getUsers };
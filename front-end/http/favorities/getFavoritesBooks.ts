import { client } from "../client";
import type { HTTPResponse } from "../types/http.response";

const getFavoritesBooks = async (): Promise<HTTPResponse<{ 
    id: string, 
    bookId: string, 
    userId: string }[]> 
    | null> => {
    try {
        const { value: { user } } = useGlobalState();

        return await client("GET", `/favorites`, null, 'application/json', {
            'userid': user?.id || '',
        });
    } catch(err) {
        console.error(err);
        return null;
    }
}

export { getFavoritesBooks };
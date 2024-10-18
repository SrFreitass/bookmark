import { client } from "../client";
import type { HTTPResponse } from "../types/http.response";

const getFavoriteBook = async (bookId: string): Promise<HTTPResponse<{ 
    id: string, 
    bookId: string, 
    userId: string }> 
    | null> => {
    try {
        const { value: { user } } = useGlobalState();

        return await client("GET", `/favorite/${bookId}`, null, 'application/json', {
            'userid': user?.id || '',
        });
    } catch(err) {
        console.error(err);
        return null;
    }
}

export { getFavoriteBook };
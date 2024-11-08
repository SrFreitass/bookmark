import { client } from "../client";
import type { HTTPResponse } from "../types/http.response";

const favoriteBook = async (bookId: string): Promise<HTTPResponse<boolean> | null> => {
    console.log("bookId", bookId);
    const globalState = useGlobalState();

    if(!globalState) {
        return null;
    };

    const { value: { user } } = globalState;

    try {
        return await client("POST", "/favorite", {
            bookId,
        }, 'application/json', {
            'userid': user?.id || '',
        });
    } catch (error) {
        console.error(error);
        return null;
    }
}

export { favoriteBook };

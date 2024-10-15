import { client } from "../client";

const getBookById = async (id: string) => {
    try {
        return await client("GET", `/book/${id}`);
    } catch (error) {
        console.error(error);
        return null;
    }
}

export { getBookById };
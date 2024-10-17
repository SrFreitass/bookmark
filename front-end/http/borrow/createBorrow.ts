import { client } from "../client"

interface Body {
    userId: string,
    bookId: string,
    type: string,
    quantity: number
}

const createBorrows = async ({ bookId, quantity, type, userId }: Body) => {
    try {
        return await client("POST", "/borrow", {
            userId,
            bookId,
            quantity,
            type,
        })
    } catch (error) {
        console.error(error)
        return null;
    }
}

export { createBorrows };
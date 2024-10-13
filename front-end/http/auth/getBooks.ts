import { client } from "../client"

const getBooksByCategory = async (category: string) => {
    client("GET", "/books")
}
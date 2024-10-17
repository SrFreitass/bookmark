import type { IBook } from "~/models/IBook";
import { client } from "../client";
import type { HTTPResponse } from "../types/http.response";

const updateBookById = async (
  id: string,
  book: Partial<IBook>,
): Promise<HTTPResponse<IBook> | null> => {
  try {
    return await client("PUT", `/book/${id}`, {
      ...book,
      authors: book.authors?.split(","),
    });
  } catch (err) {
    console.error(err);
    return null;
  }
};

export { updateBookById };

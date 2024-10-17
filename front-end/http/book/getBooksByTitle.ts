import type { IBook } from "~/models/IBook";
import type { HTTPResponse } from "../types/http.response";
import { client } from "../client";

const getBooksByTitle = async (
  title: string,
): Promise<HTTPResponse<IBook[]> | null> => {
  try {
    return await client("GET", `/book?title=${title}`);
  } catch (err) {
    console.error(err);
    return null;
  }
};

export { getBooksByTitle };

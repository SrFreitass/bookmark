import type { IBook } from "~/models/IBook";
import { client } from "../client";
import type { HTTPResponse } from "../types/http.response";

const createBook = async (
  body: Omit<IBook, "id"> & { categoryId: string; available: number },
): Promise<HTTPResponse<
  IBook & { categoryId: string; available: number }
> | null> => {
  try {
    const json = await client("POST", "/book", {
      ...body,
      available: body.available,
      authors: body.authors?.split(","),
    });
    return json;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export { createBook };

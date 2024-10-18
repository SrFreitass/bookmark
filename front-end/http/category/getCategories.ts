import { client } from "../client";
import type { HTTPResponse } from "../types/http.response";

const getCategories = async (): Promise<HTTPResponse<
  {
    name: string;
    id: string;
  }[]
> | null> => {
  try {
    return await client("GET", "/categories");
  } catch (err) {
    console.error(err);
    return null;
  }
};

export { getCategories };

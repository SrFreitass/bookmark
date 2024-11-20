import { client } from "../client";
import type { HTTPResponse } from "../types/http.response";

const deleteFavoriteBook = async (bookId: string): Promise<HTTPResponse<unknown> | null>  => {
  const globalState = useGlobalState();

  if (!globalState) return null;

  try {
    return await client("DELETE", "/favorite", {
      bookId
    });
  } catch(err) {
    console.error(err);
    return null;
  }
}

export { deleteFavoriteBook };

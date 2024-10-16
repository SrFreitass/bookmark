import type { IBook } from "~/models/IBook";
import { client } from "../client";
import type { HTTPResponse } from "../types/http.response";

const uploadCoverBook = async (
  file: File,
  title: string,
): Promise<HTTPResponse<{ name: string; cover: string }> | null> => {
  try {
    if (!title) {
      title = file.name;
    }

    const form = new FormData();
    form.append("name", title);
    form.append("coverFile", file);

    const res = await client(
      "POST",
      "/book/cover",
      form,
      "multipart/form-data",
    );

    return res;
  } catch (error) {
    console.log("uploadCoverBook", error);
    return null;
  }
};

export { uploadCoverBook };

import { BookRepository } from "../../repositories/IBook.repository";
import { uploadBookCoverDTO } from "../../../application/dto/upload.dto";

class UploadBookCoverUseCase {
    constructor() {}
    
    async execute(data: typeof uploadBookCoverDTO.static): Promise<any> {
      const nameImage = `${data.coverFile.name.replaceAll(" ", "-")}-${new Date().getTime()}`;

      await Bun.write(`./static/book-covers/${nameImage}.png`, data.coverFile);

      return {
        name: data.name,
        cover: `/static/book-covers/${nameImage}`,
      };
    }
}

export { UploadBookCoverUseCase };
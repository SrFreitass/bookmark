import { App } from "../../config/app";
import { UploadBookCoverUseCase } from "../../core/domains/usecases/uploadBookCoverUseCase";
import { uploadBookCoverDTO } from "../dto/upload.dto";
import { errorResponse } from "../utils/error.response";
import { successResponse } from "../utils/success.response";

class UploadController {
    constructor(private readonly app: typeof App) {
        this.app.post("/api/v1/book/cover", async (context) => {
            try {
                const useCase = new UploadBookCoverUseCase();
                const output = await useCase.execute(context.body);
                return successResponse(200, output, 'Cover uploaded successfully')
            } catch (error) {
                return errorResponse(error);
            }
        },
        {
            body: uploadBookCoverDTO,
            type: 'multipart/form-data',
        }
        )
    }
}

export { UploadController };
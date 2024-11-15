import { App } from "../../config/app";
import { UploadBookCoverUseCase } from "../../core/domains/usecases/uploadBookCoverUseCase";
import { uploadBookCoverDTO } from "../dto/upload.dto";
import routes from "../middleware/protectedRoutes";
import { verifyUserMiddlare } from "../middleware/verifyUser.middleware";
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
            async beforeHandle(context) {
                const err = await verifyUserMiddlare({
                    headers: context.headers,
                    jwt: context.jwt,
                    path: context.path as keyof typeof routes,
                });

                if(err) return errorResponse(err);
            },
            body: uploadBookCoverDTO,
            type: 'multipart/form-data',
        }
        )
    }
}

export { UploadController };

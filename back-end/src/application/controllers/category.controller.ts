import { App } from "../../config/app";
import { CreateCategoryUseCase } from "../../core/domains/usecases/createCategory.usecase";
import { db } from "../../infra/db/connect";
import { categories } from "../../infra/db/schema";
import { CategoryRepositoryImpl } from "../../infra/repositories/category.repository";
import { createCategoryDTO } from "../dto/category.dto";
import { errorResponse } from "../utils/error.response";
import { successResponse } from "../utils/success.response";

class CategoryController {
    constructor(app: typeof App) {
        app.post("/api/v1/category", async (context) => {
            try {
                const useCase = new CreateCategoryUseCase(new CategoryRepositoryImpl(db, categories));
                const output = await useCase.execute(context.body.name);
                return successResponse(201, output, 'Category created');
            } catch (error) {
                return errorResponse(error);
            }
        },
        {
            body: createCategoryDTO
        }
    )
    }
}

export { CategoryController };
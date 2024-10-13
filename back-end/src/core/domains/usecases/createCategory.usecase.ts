import { CategoryRepository } from "../../repositories/ICategory.repository";
import { CategoryEntity } from "../entities/category.entity";

class CreateCategoryUseCase {
    constructor(private readonly categoryRepository: CategoryRepository) {}

    async execute(name: string) {
        const categoryEntity = new CategoryEntity({ name });
        
        return await this.categoryRepository.createCategory(categoryEntity);
    }
}

export { CreateCategoryUseCase };
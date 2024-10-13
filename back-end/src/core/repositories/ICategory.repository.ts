import { CategoryEntity } from "../domains/entities/category.entity";

interface CategoryRepository {
    createCategory(category: CategoryEntity): Promise<CategoryEntity>;
}

export { CategoryRepository };
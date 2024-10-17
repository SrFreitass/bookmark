import { CategoryEntity } from "../domains/entities/category.entity";

interface CategoryRepository {
  findCategories(): Promise<CategoryEntity[]>;
  createCategory(category: CategoryEntity): Promise<CategoryEntity>;
}

export { CategoryRepository };

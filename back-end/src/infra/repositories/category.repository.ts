import { CategoryEntity } from "../../core/domains/entities/category.entity";
import { CategoryRepository } from "../../core/repositories/ICategory.repository";
import { db } from "../db/connect";
import { categories } from "../db/schema";

class CategoryRepositoryImpl implements CategoryRepository {
  constructor(
    private readonly database: typeof db,
    private readonly category: typeof categories,
  ) {}

  async findCategories(): Promise<CategoryEntity[]> {
    return await this.database.query.categories.findMany();
  }

  async createCategory(category: CategoryEntity): Promise<CategoryEntity> {
    const newCategory = await this.database
      .insert(this.category)
      .values(category);

    return category;
  }
}

export { CategoryRepositoryImpl };

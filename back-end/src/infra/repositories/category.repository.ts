import { CategoryEntity } from "../../core/domains/entities/category.entity";
import { CategoryRepository } from "../../core/repositories/ICategory.repository";
import { db } from "../db/connect";
import { categories } from "../db/schema";

class CategoryRepositoryImpl implements CategoryRepository {
    constructor(private readonly database: typeof db, private readonly category: typeof categories) {}

    async createCategory(category: CategoryEntity): Promise<CategoryEntity> {
        await this.database.insert(this.category).values(category);

        return category;
    }
}

export { CategoryRepositoryImpl }
import { CategoryRepository } from "../../repositories/ICategory.repository";

class GetCategoriesUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute() {
    return await this.categoryRepository.findCategories();
  }
}

export { GetCategoriesUseCase };

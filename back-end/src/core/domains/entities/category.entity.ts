class CategoryEntity {
    readonly id: string;
    readonly name: string;

    constructor({
        name
    }: Omit<CategoryEntity, 'id'>) {
        this.id = crypto.randomUUID();
        this.name = name;
    }
}

export { CategoryEntity };
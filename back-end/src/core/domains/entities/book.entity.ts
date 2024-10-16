class BookEntity {
  readonly isbn: string;
  readonly id: string;
  readonly title: string;
  readonly description: string | null;
  readonly authors: string[];
  readonly coverURL: string;
  readonly publisher: string;
  readonly publishedAt: string;
  readonly pages: number;
  readonly quantity: number;
  readonly available: number;
  readonly createdAt: Date;
  readonly updatedAt: Date | null;
  readonly categoryId: string;
  readonly category?: string;

  constructor({
    title,
    description,
    authors,
    coverURL,
    publisher,
    publishedAt,
    categoryId,
    isbn,
    available,
    quantity,
    pages,
  }: Omit<BookEntity, 'id' | 'createdAt' | 'updatedAt'>) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.authors = authors;
    this.coverURL = coverURL;
    this.publisher = publisher;
    this.publishedAt = publishedAt;
    this.quantity = quantity;
    this.available = available;
    this.isbn = isbn;
    this.pages = pages;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.categoryId = categoryId
    this.category = '';
  }
}

export { BookEntity };


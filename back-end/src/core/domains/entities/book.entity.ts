class BookEntity {
  readonly isbn: string;
  readonly id: string;
  readonly title: string;
  readonly description: string | null;
  readonly authors: string[];
  readonly coverURL: string;
  readonly publisher: string;
  readonly publishedAt: Date;
  readonly pages: number;
  readonly quantity: number;
  readonly available: number;
  readonly createdAt: Date;
  readonly updatedAt: Date | null;

  constructor({
    title,
    description,
    authors,
    coverURL,
    publisher,
    publishedAt,
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
  }
}

export { BookEntity };


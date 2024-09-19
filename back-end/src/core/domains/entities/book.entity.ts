class BookEntity {
  isbn: string;
  id: string;
  title: string;
  description: string | null;
  authors: string[];
  coverURL: string;
  publisher: string;
  publishedAt: Date;
  pages: number;
  quantity: number;
  available: number;
  createdAt: Date;
  updatedAt: Date | null;

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

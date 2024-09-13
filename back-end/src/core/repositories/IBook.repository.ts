interface BookRepository {
    create(book: BookEntity): Promise<void>;
    findBook(fields: { title?: string, isbn?: string, id?: string }): Promise<BookEntity | null>;
    findBooks(page: number): Promise<BookEntity[]>;
}

export { BookRepository };


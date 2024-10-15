interface IBook {
    id: string;
    isbn: string;
    title: string;
    description: string;
    coverURL: string;
    authors: string[];
    pages: number;
    category: string;
    publishedAt: string;
    publisher: string;
    quantity: number;
    language: string;
}

export type { IBook }
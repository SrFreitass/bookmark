interface IBook {
  id: string;
  isbn: string;
  title: string;
  description: string;
  coverURL: string;
  authors: string;
  pages: number;
  category: string;
  publishedAt: string;
  publisher: string;
  quantity: number;
  language: string;
  available: number;
}

export type { IBook };

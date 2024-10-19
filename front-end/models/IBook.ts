interface IBook {
  id: string;
  isbn: string;
  title: string;
  description: string;
  coverURL: string;
  authors: string;
  pages: number | null;
  category: string;
  publishedAt: string;
  publisher: string;
  quantity: number | null;
  language: string;
  available: number | null;
}

export type { IBook };

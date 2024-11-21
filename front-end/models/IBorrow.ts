interface IBorrow {
    bookId: string,
    userId: string,
    bookTitle: string,
    authors: string[],
    coverURL: string,
    borrow: boolean | string,
    createdAt: string,
    statusUpdateAt: string,
    limitDate: string
}

export type { IBorrow }

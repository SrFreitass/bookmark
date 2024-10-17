interface IBorrow {
    id: string,
    bookId: string,
    userId: string,
    borrow: boolean | string,
    createdAt: string,
    statusUpdateAt: string,
    limitDate: string
}

export type { IBorrow }
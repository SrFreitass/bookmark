const routes = {

    // BORROW

    '/api/v1/borrows': {
        roles: ["ADMIN", "LIBRARIAN"],
    },
    '/api/v1/borrow/return': {
        roles: ["ADMIN", "LIBRARIAN"],
    },
    '/api/v1/borrow': {
        roles: ["ADMIN", "LIBRARIAN"],
    },

    // BOOK
    '/api/v1/book': {
        roles: ["ADMIN", "LIBRARIAN"],
    },
    '/api/v1/book/*': {
        roles: ["ADMIN", "LIBRARIAN"]
    }
}

export default routes;
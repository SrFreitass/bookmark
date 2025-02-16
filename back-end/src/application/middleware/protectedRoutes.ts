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
    },

    // CATEGORY

    '/api/v1/category': {
        roles: ["ADMIN", "LIBRARIAN"]
    },

    // COVER UPLOAD

    '/api/v1/book/cover': {
        roles: ["ADMIN", "LIBRARIAN"]
    },

    // USER

    '/api/v1/user': {
        roles: ["ADMIN", "LIBRARIAN"]
    },
    '/api/v1/users/*': {
        roles: ["ADMIN", "LIBRARIAN"]
    },
    '/api/v1/user/*': {
        roles: ["ADMIN", "LIBRARIAN"]
    },

    // AUTH

    '/api/v1/auth/user': {
        roles: ["ADMIN", "LIBRARIAN"]
    },
}

export default routes;
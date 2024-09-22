import { describe, expect, test } from "bun:test";
import { App } from "../../config/app";

describe("E2E API tests", () => {
    test("GET /api/v1/health", async () => {
        const http = await App.handle(new Request("http://localhost:8080/api/v1/health"))
        const response = await http.json();

        expect(response).toStrictEqual({
            success: true,
            statusCode: 200,
            message: 'Server is running',
            data: [],
        })
    });
});

// sdescribe("E2E API tests - Auth", () => {
//     test("POST /api/v1/auth/signup", async () => {
//         const http = await App.handle(new Request("http://localhost:8080/api/v1/auth/signup", {
//             method: "POST",
//             body: JSON.stringify({
//                 email: ""
//             })
//     })
// });
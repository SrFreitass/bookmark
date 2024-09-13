import { App } from "../../config/app";
import { AuthController } from "../controllers/authController";

export class Router {
    constructor(private readonly server: typeof App) {}

    async execute() {
        new AuthController(this.server);
    }
}   
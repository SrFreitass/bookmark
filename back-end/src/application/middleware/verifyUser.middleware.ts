import { Context } from "elysia";
import { IJWT } from "../../@types/interfaces";
import { ErrorHandler } from "../utils/error.handle";
import routes from "./protectedRoutes";

const verifyUserMiddlare = async (context: Context & { jwt: IJWT }) => {
    if (!context.headers?.authorization) {
        throw new ErrorHandler("Token not provided", 401);
    }

    const token = context.headers?.authorization.split(" ")[1];

    if (!token) {
        throw new ErrorHandler("Token not provided", 401);
    }

    const isTokenValid = await context.jwt.verify(token)

    if (!isTokenValid) {
        throw new ErrorHandler("Invalid token", 401);
    }

    context.headers["userId"] = isTokenValid.sub;

    const path = context.path as keyof typeof routes;

    if(!routes[path]) return;

    if(!routes[path].roles.includes(isTokenValid.role as string)) {
        throw new ErrorHandler('Unauthorized', 403);
    }

}

export { verifyUserMiddlare };


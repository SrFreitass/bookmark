import { Context } from "elysia";
import { IJWT } from "../../@types/interfaces";
import { ErrorHandler } from "../utils/error.handle";

const verifyUserMiddlare = async (context: Context & { jwt: IJWT }) => {
    if (!context.headers.authorization) {
        throw new ErrorHandler("Token not provided", 401);
    }

    const token = context.headers.authorization.split(" ")[1];

    if (!token) {
        throw new ErrorHandler("Token not provided", 401);
    }

    const isTokenValid = await context.jwt.verify(token)

    if (!isTokenValid) {
        throw new ErrorHandler("Invalid token", 401);
    }

    context.headers["userId"] = isTokenValid.sub;

}

export { verifyUserMiddlare };


import { IJWT } from "../../@types/interfaces";
import { ErrorHandler } from "../utils/error.handle";
import routes from "./protectedRoutes";

const verifyUserMiddlare = async ({ headers, path, jwt }: { headers: Record<string, string | undefined>; path: keyof typeof routes; jwt: IJWT }) => {
    if (!headers?.authorization) {
        return new ErrorHandler("Token not provided", 401);
    }

    const token = headers?.authorization;

    if (!token) {
        return new ErrorHandler("Token not provided", 401);
    }

    const isTokenValid = await jwt.verify(token);

    if (!isTokenValid) {
        return new ErrorHandler("Invalid token", 401);
    }

    headers['userid'] = isTokenValid.sub;

    if(!routes[path]) return;

    if(!routes[path].roles.includes(isTokenValid.role as string)) {
        return new ErrorHandler('Unauthorized', 403);
    }

    

}

export { verifyUserMiddlare };


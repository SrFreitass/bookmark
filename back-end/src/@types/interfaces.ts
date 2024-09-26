import { JWTPayloadSpec } from "@elysiajs/jwt";

interface JwtPayload extends JWTPayloadSpec {
    email: string;
    role: "DEVELOPER" | "ADMIN" | "LIBRARIAN" | "STUDENT";
}

interface IJWT {
    sign: (morePayload: Record<string, string | number> & JwtPayload) => Promise<string>;
    verify: (payload: string) => Promise<JwtPayload | false>;
}

export { IJWT };


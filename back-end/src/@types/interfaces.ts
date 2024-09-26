import { JWTPayloadSpec } from "@elysiajs/jwt";


interface Payload extends JWTPayloadSpec {
    email: string;
    sub: string;
    role: 'DEVELOPER' | 'ADMIN' | 'LIBRARIAN' | 'STUDENT';
}

interface IJWT {
    sign: (morePayload: Record<string, string | number> & Payload) => Promise<string>;
    verify: (payload: string) => Promise<JWTPayloadSpec | false>;
}

export { IJWT };


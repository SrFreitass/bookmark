import { JWTPayloadSpec } from "@elysiajs/jwt";

interface IJWT {
    sign: (morePayload: Record<string, string | number> & JWTPayloadSpec) => Promise<string>;
    verify: (payload: string) => Promise<JWTPayloadSpec | false>;
}

export { IJWT };

import { useGlobalState } from "#imports";
import { jwtDecode, type JwtPayload } from "jwt-decode";
import { verifyToken } from "~/http/auth/verifyToken";

export interface Tokens {
    token: string;
    refreshToken: string;
}

const adminMiddleware = defineNuxtRouteMiddleware(async (to, from) => {
    if(!import.meta.client) return;
    const stateGlobal = useGlobalState();
    const tokens = useCookie<Tokens>('tokens').value || JSON.parse(sessionStorage.getItem('tokens') || '{}') as Tokens;

    if(!stateGlobal.value.user && !tokens.token) return navigateTo('/404')

    const res = await verifyToken(tokens.token);
    
    if(!res?.success) return navigateTo('/404');
    
    const payload = jwtDecode(tokens.token || '') as JwtPayload & { role: string };
    console.log(res, tokens, payload)

    if(payload?.role === 'STUDENT') return navigateTo('/404');
});

export default adminMiddleware;

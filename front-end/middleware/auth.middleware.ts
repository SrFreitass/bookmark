import { jwtDecode } from "jwt-decode";
import { verifyToken } from "~/http/auth/verifyToken";
import { getUserById } from "~/http/user/getUserById";

interface Tokens {
    token: string;
    refreshToken: string;
}

const middleware = defineNuxtRouteMiddleware(async (to, from) => {
    if(!import.meta.client) return;

    const tokens = useCookie<Tokens>('tokens').value || JSON.parse(sessionStorage.getItem('tokens') || '{}') as Tokens;

    if(tokens.token) {
        const tokensDecoded = jwtDecode(tokens.token || '');

        if(!tokensDecoded.sub) return;

        const verify = await verifyToken(tokens.token);     

        if(verify?.success) return navigateTo('/');
    }
})

export default middleware;
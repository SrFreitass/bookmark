import { jwtDecode } from "jwt-decode";
import { verifyToken } from "~/http/user/verifyToken";

interface Tokens {
    token: string;
    refreshToken: string;
}

const middleware = defineNuxtRouteMiddleware(async (to, from) => {
    if(!import.meta.client) return;

    const tokens = useCookie<Tokens>('tokens').value || JSON.parse(sessionStorage.getItem('tokens') || '{}') as Tokens;

    if(to.path.includes("/signup") || to.path.includes("/signin") && tokens.token) {; 

        const verify = await verifyToken(tokens.token);

        if(verify?.success) return navigateTo("/");
    }
})

export default middleware;
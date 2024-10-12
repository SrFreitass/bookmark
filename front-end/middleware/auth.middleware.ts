import { jwtDecode } from "jwt-decode";
import { getUserById } from "~/http/user/getUserById";

interface Tokens {
    token: string;
    refreshToken: string;
}

const middleware = defineNuxtRouteMiddleware(async (to, from) => {
    if(!import.meta.client) return;

    const tokens = useCookie<Tokens>('tokens').value || JSON.parse(sessionStorage.getItem('tokens') || '{}') as Tokens;

    if(to.path.includes("/signup") || to.path.includes("/signin") && tokens.token) {

        const tokenDecoded = jwtDecode(tokens.token || ''); 


        const user = await getUserById(tokenDecoded.sub || '');

        if(user?.success) return navigateTo("/");
    }
})

export default middleware;
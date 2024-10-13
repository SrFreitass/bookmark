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
    const stateGlobal = useGlobalState();


    if(tokens.token && !stateGlobal.value.user) {
        const tokensDecoded = jwtDecode(tokens.token || '');

        if(!tokensDecoded.sub) return;

        const verify = await verifyToken(tokens.token);     

        const user = await getUserById(tokensDecoded.sub);

        if(user?.data) {
            stateGlobal.value.user = {
                id: tokensDecoded.sub,
                ...user?.data
            }
        }


        if(verify?.success && to.path.includes("auth")) return navigateTo('/');
    }
    
})

export default middleware;
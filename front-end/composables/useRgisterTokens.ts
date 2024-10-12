import dayjs from 'dayjs'


const useRegisterTokens = (token: string, refreshToken: string, persist: boolean) => {
    const expires = dayjs().add(7, 'days').toDate();

    if(!persist) {
        sessionStorage.setItem("tokens", JSON.stringify({
            token,
            refreshToken
        }))

        return;
    }

    const tokenCookie = useCookie("tokens", {
        expires,
    })

    tokenCookie.value = JSON.stringify({
        token,
        refreshToken
    })
};

export { useRegisterTokens }
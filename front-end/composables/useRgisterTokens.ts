import dayjs from 'dayjs'


const useRegisterTokens = (token: string, refreshToken: string) => {
    const expires = dayjs().add(7, 'days').toDate();

    const tokenCookie = useCookie("tokens", {
        expires,
    })

    tokenCookie.value = JSON.stringify({
        token,
        refreshToken
    })
};

export { useRegisterTokens }
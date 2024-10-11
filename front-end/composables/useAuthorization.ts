const useAuthorization = () => {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');

    if(!token || !refreshToken) {
        return {
            token: null,
            refreshToken: null
        }
    }

    return {
        token,
        refreshToken
    }
}

export { useAuthorization }
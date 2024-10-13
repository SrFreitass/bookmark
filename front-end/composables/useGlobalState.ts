interface User {
    id: string;
    name: string;
    role: string;
    avatarURL: string;
}

const useGlobalState = () => {
    return useState('globalState', (): { user: User | null }  => {
        return {
            user: null
        }
    })
}

export { useGlobalState };
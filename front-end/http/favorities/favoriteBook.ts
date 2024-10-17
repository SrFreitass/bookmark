import { client } from "../client";

const favoriteBook = async (bookId: string) => {
    const toast = useToast();
    const globalState = useGlobalState();

    if(!globalState) {
        toast.add({
            severity: 'error',
            summary: "Erro",
            detail: "Você precisa estar logado para favoritar um livro"
        })
        return null;
    };

    const { value: { user } } = globalState;

    try {
        return await client("POST", "/favorite", {
            userId: user?.id,
            bookId
        });
    } catch (error) {
        console.error(error);
        return null;
    }
}
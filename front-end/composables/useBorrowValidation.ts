import { getBookByISBN } from "~/http/book/getBookByISBN";
import { getUserByName } from "~/http/user/getUserByName";
import type { IBorrow } from "~/models/IBorrow";

const useBorrowValidation = ({ bookId: isbn, userId: username, }: Omit<IBorrow, 'id' | 'borrow' | 'createdAt' | 'statusUpdateAt' | 'limitDate'>) => {
    let containsErrors = false;

    const formErrors: Record<string, { error: boolean; message: string }> = {};
  
    const validateField = (
      condition: boolean,
      field: string,
      message: string,
    ) => {
      if (condition) {
        formErrors[field] = { error: true, message };
        containsErrors = true;
      } else {
        formErrors[field] = { error: false, message: "" };
      }
    };

    const validateBookId = async (bookId: string) => {
        const book = await getBookByISBN(bookId);
        
        validateField(
            !bookId || !book?.data,
            "bookId",
            "Livro inválido"
        )

        return;
    }

    const validateUserId = async (username: string) => {
        const user = await getUserByName(username);
        validateField(
            !username || !user?.data,
            "userId",
            "Usuário inválido"
        );
        return;
    }

    validateBookId(isbn);
    validateUserId(username); 
    
    return { containsErrors, formErrors };
}

export { useBorrowValidation};
import type { IBook } from "~/models/IBook";

const useEditBookValidation = ({
  isbn,
  title,
  authors,
  category,
  publisher,
  publishedAt,
  language,
  pages,
  quantity,
}: Partial<IBook>) => {
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

  // TODO: CHECK ISBN FUNCTION;
  validateField(
    isbn?.length !== 13 && isbn?.length !== 10,
    "isbn",
    "ISBN menor que 10 ou maior que 13!",
  );

  validateField(!title, "title", "Título inválido!");

  validateField(!authors, "authors", "Autor(es) inválido");

  validateField(!category, "category", "Categoria inválida");

  validateField(!publisher, "publisher", "Editora inválida");

  validateField(
    !publishedAt || publishedAt.length !== 4 || isNaN(Number(publishedAt)),
    "publishedAt",
    "Data de publicação inválida",
  );

  validateField(!language, "language", "Idioma inválido");

  validateField(
    !pages || pages < 1 || pages > 10000,
    "pages",
    "Número de páginas inválido",
  );

  console.log(quantity, "validatiooonn");

  validateField(!quantity || quantity < 1, "quantity", "Quantidade inválida");

  return { containsErrors, formErrors };
};

export { useEditBookValidation };

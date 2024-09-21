// Só deus sabe... só fé, é o grelo, calabreso
const validateISBN = (isbn: string) => {
  let multiple = 3;
  let total = 0;

  for (let i = 0; i < 12; i++) {
    total += parseInt(isbn[i]) * multiple;
    multiple = multiple === 3 ? 1 : 3;
  }

  const check = total % 10;

  return check === parseInt(isbn[12]);
};

export { validateISBN };

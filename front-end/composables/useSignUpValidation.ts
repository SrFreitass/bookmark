interface FormInputs {
    username: string;
    name: string;
    email: string;
    birthday: string;
    password: string;
    confirmPassword: string;
}

const useSignUpValidation = ({ username, name, email, birthday, password, confirmPassword }: FormInputs) => {
    let containsErrors = false;

    const formErrors: Record<string, { error: boolean, message: string }> = { };

    const validateField = (condition: boolean, field: string, message: string) => {
        if(condition) {
            containsErrors = true;

            formErrors[field] = {
                error: true,
                message
            };
        } else {
            formErrors[field] = {
                error: false,
                message: ''
            }
        }
    }

    validateField(
        username.length < 3, 
        'username', 
        'Apelido inválido! Menor que três caracteres'
    );

    validateField(
        name.length < 3,
        'name',
        'Nome inválido! Menor que três caracteres'
    )

    validateField(
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/g.test(email), 
        'email', 
        'E-mail inválido!'
    );

    validateField(
        !(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/g.test(password)), 
        'password', 
        'A senha deve conter 8 caracteres, 1 número e 1 caracter especial!'
    );

    validateField(
        Number.isNaN(new Date(birthday).getTime()),
        'birthday',
        'Data de nascimento inválida!'
    )

    validateField(
        password != confirmPassword,
        'confirmPassword',
        'As senhas não se coincidem'
    )

    return { formErrors, containsErrors };
}

export { useSignUpValidation }
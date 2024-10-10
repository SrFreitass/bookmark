interface FormInputs {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const useSignUpValidation = ({ name, email, password, confirmPassword }: FormInputs) => {
    const formErrors = reactive({
        name: {
            message: '',
            error: false,
        },
        email: {
            message: '',
            error: false,
        },
        password: {
            message: '',
            error: false,
        },
        confirmPassword: {
            message: '',
            error: false,
        }
    });

    const nameErr = formErrors.name;
    const emailErr = formErrors.email;
    const passwordErr = formErrors.password;
    const confirmPasswordErr = formErrors.confirmPassword;

    if (name.length < 3) {
        nameErr.error = true;
        nameErr.message = 'Nome inválido! Menor que três caracteres'
    } else {
        nameErr.error = false;
        nameErr.message = '';
    };

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/g;

    if (!regexEmail.test(email) || email.length < 3) {

        emailErr.error = true;
        emailErr.message = 'E-mail inválido!'
    } else {
        emailErr.error = false;
        emailErr.message = '';
    };

    const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g;

    if (!regexPassword.test(password)) {

        passwordErr.error = true;
        passwordErr.message = 'A senha deve conter 8 caracteres, 1 número e 1 caracter especial!'
    } else {
        passwordErr.error = false;
        passwordErr.message = '';
    };

    console.log(password != confirmPassword)
    if (password != confirmPassword) {
        confirmPasswordErr.error = true;
        confirmPasswordErr.message = 'A senha não se coincidem';
    } else {
        confirmPasswordErr.error = false;
        confirmPasswordErr.message = '';
    }

    return { formErrors };
}

export { useSignUpValidation }
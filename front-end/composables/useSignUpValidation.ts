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

    const formErrors = reactive({
        username: {
            message: '',
            error: false,
        },

        name: {
            message: '',
            error: false,
        },
        email: {
            message: '',
            error: false,
        },
        birthday: {
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

    const usernameErr = formErrors.username;
    const birthdayErr = formErrors.birthday;
    const nameErr = formErrors.name;
    const emailErr = formErrors.email;
    const passwordErr = formErrors.password;
    const confirmPasswordErr = formErrors.confirmPassword;
    
    if(username.length < 3) {
        containsErrors = true;
        usernameErr.error = true;
        usernameErr.message = 'Apelido inválido! Menor que três caracteres'
    } else {
        usernameErr.error = false;
        usernameErr.message = '';
    }


    if (name.length < 3) {
        containsErrors = true;
        nameErr.error = true;
        nameErr.message = 'Nome inválido! Menor que três caracteres'
    } else {
        nameErr.error = false;
        nameErr.message = '';
    };

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/g;

    if (!regexEmail.test(email) || email.length < 3) {
        containsErrors = true;
        emailErr.error = true;
        emailErr.message = 'E-mail inválido!'
    } else {
        emailErr.error = false;
        emailErr.message = '';
    };


    if(!birthday) {
        containsErrors = true;
        birthdayErr.error = true;
        birthdayErr.message = 'Insira um data válida!'
    } else {
        birthdayErr.error = false;
        birthdayErr.message = '';
    }

    const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g;

    if (!regexPassword.test(password)) {
        containsErrors = true;
        passwordErr.error = true;
        passwordErr.message = 'A senha deve conter 8 caracteres, 1 número e 1 caracter especial!'
    } else {
        passwordErr.error = false;
        passwordErr.message = '';
    };

    if (password != confirmPassword) {
        containsErrors = true;
        confirmPasswordErr.error = true;
        confirmPasswordErr.message = 'A senha não se coincidem';
    } else {
        confirmPasswordErr.error = false;
        confirmPasswordErr.message = '';
    }

    return { formErrors, containsErrors };
}

export { useSignUpValidation }
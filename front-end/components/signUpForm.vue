<template>
    <form class="flex flex-col gap-4" @submit="onSubmit">
        <UiInputForm
            :model-value="form.name"
            :error="formErrors.errors.name.error"
            :message="formErrors.errors.name.message"
            place-holder="Seu nome"
            icon="pi pi-user"
        />

        <UiInputForm
            :model-value="form.email"
            :error="formErrors.errors.email.error"
            :message="formErrors.errors.email.message"
            place-holder="Seu melhor e-maiil"
            icon="pi pi-envelope"
         />

        <UiInputForm
            :model-value="form.password"
            :error="formErrors.errors.password.error"
            :message="formErrors.errors.password.message"
            place-holder="Sua senha"
            icon="pi pi-lock"
         />

         <UiInputForm
            :model-value="form.confirmPassword"
            :error="formErrors.errors.confirmPassword.error"
            :message="formErrors.errors.confirmPassword.message"
            place-holder="Confirmar sua senha"
            icon="pi pi-lock"
         />

         <Button type="submit">Registrar</Button>
    </form>
</template>

<script setup lang="ts">
    const form = reactive({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const formErrors = reactive({ 
        errors: {    
            name: {
                message: '',
                error: false
            },
            email: {
                message: '',
                error: false
            },
            password: {
                message: '',
                error: false
            },
            confirmPassword: {
                message: '',
                error: false
            }
        }
    });


    const onSubmit = (e: Event) => {
        e.preventDefault();
        const { formErrors: formErr } = useSignUpValidation(form);
        console.log(formErrors);
        formErrors.errors = { ...formErr };
    };
</script>
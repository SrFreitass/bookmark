<template>
    <form class="flex flex-col gap-4" @submit="onSubmit">
        <div v-for="input in Object.keys(inputs)">
            <InputGroup>
                <InputGroupAddon>
                    <i :class="inputs[input as keyof typeof inputs]['icon']"></i>
                </InputGroupAddon>
                <InputText 
                    :type="inputs[input as keyof typeof inputs]['type']"
                    :class="
                    `${formErrors['errors'][input as keyof typeof formErrors['errors']].error && '!border-red-500'}`
                    "
                    :placeholder="inputs[input as keyof typeof inputs]['placeholder']" 
                    v-model:model-value="form[input as keyof typeof form]"
                />
            </InputGroup>
            <p 
                v-if="formErrors['errors'][input as keyof typeof formErrors['errors']]"
                class="text-red-500 mt-2"
            >
                {{ formErrors['errors'][input as keyof typeof formErrors['errors']].message  }}
            </p>
        </div>

         <Button type="submit">Registrar</Button>
    </form>
</template>

<script setup lang="ts">
import { createAccount } from '~/http/auth/createAccount';

    const inputs = {
        username: {
            placeholder: 'Seu apelido',
            icon: 'pi pi-at',
            type: 'text'
        },
        name: {
            placeholder: 'Seu nome',
            icon: 'pi pi-user',
            type: 'text'
        },
        email: {
            placeholder: 'Seu melhor e-mail',
            icon: 'pi pi-envelope',
            type: 'text'
        },
        birthDay: {
            placeholder: 'Sua data de nascimento',
            icon: 'pi pi-calendar',
            type: 'date'
        },
        password: {
            placeholder: 'Sua senha',
            icon: 'pi pi-lock',
            type: 'password'
        },
        confirmPassword: {
            placeholder: 'Confirme sua senha',
            icon: 'pi pi-lock',
            type: 'password'
        },
    }

    const form = reactive({
        username: '',
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        birthDay: ''
    });

    const formErrors = reactive({ 
        errors: {    
            username: {
                message: '',
                error: false,
            },

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
            birthDay: {
                message: '',
                error: false
            },
            confirmPassword: {
                message: '',
                error: false
            }
        }
    });


    const onSubmit = async (e: Event) => {
        e.preventDefault();
        const { formErrors: formErr, containsErrors } = useSignUpValidation(form);
        formErrors.errors = { ...formErr };
        
        if (containsErrors) return;

        await createAccount({
            username: form.username,
            name: form.name,
            password: form.password,
            birthDay: form.birthDay,
            email: form.email,
        });

    };
</script>
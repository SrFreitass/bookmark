<template>
    <form class="flex flex-col gap-4" @submit="onSubmit">
        <div v-for="(config, key) in inputs">
            <InputGroup>
                <InputGroupAddon>
                    <i :class="config['icon']"></i>
                </InputGroupAddon>
                <InputText 
                    :type="config['type']"
                    :class="
                    `${formErrors['errors'][key]['error'] ? '!border-red-500' : ''}`
                    "
                    :placeholder="config['placeholder']" 
                    v-model:model-value="form[key]"
                />
            </InputGroup>
            <p 
                v-if="formErrors['errors'][key]['error']"
                class="text-red-500 mt-2"
            >
                {{ formErrors['errors'][key].message }}
            </p>
        </div>

        <div class="flex gap-2">
            <Checkbox v-model:model-value="checkbox" :binary="true"/>
            <label>Lembrar de mim</label>
        </div>
         <Button type="submit">Registrar</Button>
         <p class="text-gray-400">Já tem uma conta? 
            <u class="text-white">
                <NuxtLink href="./signin">Entrar</NuxtLink>
            </u>
        </p>
    </form>
</template>

<script setup lang="ts">
import Checkbox from 'primevue/checkbox';
import { useRegisterTokens } from '~/composables/useRgisterTokens';
import { createAccount } from '~/http/auth/createAccount';

    const errors  = {
        'Username already exists': () => { 
            formErrors.errors.username.error = true;
            formErrors.errors.username.message = 'Apelido de usuário já existe!'
        },
        'Email already exists': () => {
            formErrors.errors.email.error = true;
            formErrors.errors.email.message = 'E-mail já registrado na plataforma!'
        }
    }

    const checkbox = ref(false);

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
        birthday: {
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
        birthday: ''
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
            birthday: {
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
        formErrors.errors = { ...formErr as typeof formErrors.errors };
        
        if (containsErrors) return;
        const res = await createAccount({
            username: form.username,
            name: form.name,
            password: form.password,
            birthday: form.birthday,
            email: form.email,
        });

        if (res && !res?.success) {
            const message = res?.message as keyof typeof errors;

            if(errors[message]) {
                errors[message]();
            }
        }

        if(res && checkbox.value) {
            const { token, refreshToken  } = res?.data;
            console.log(token, refreshToken);

            useRegisterTokens(token, refreshToken);
        }

    };
</script>
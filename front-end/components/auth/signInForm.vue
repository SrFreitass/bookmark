<template>
    <form class="flex flex-col gap-4" @submit="onSubmit">
        <div>
            <InputGroup>
                <InputGroupAddon>
                    <i class="pi pi-envelope"</i>
                </InputGroupAddon>
                <InputText 
                    :class="`${formErrors['email']['error'] ? '!border-red-500' : ''}`"
                    placeholder="Seu e-mail" 
                    v-model:model-value="form.email"
                />
            </InputGroup>
            <p 
                    v-if="formErrors['email']['error']" 
                    class="text-red-500 mt-2"
            >
                {{ formErrors['email']['message'] }}
            </p> 
        </div>

        <div>
            <InputGroup>
                <InputGroupAddon>
                    <i class="pi pi-lock"</i>
                </InputGroupAddon>
                <InputText 
                    :class="`${formErrors['password']['error'] ? '!border-red-500' : ''}`"
                    type="password" 
                    placeholder="Sua senha" 
                    v-model:model-value="form.password"
                />
            </InputGroup>
            <p v-i
                    f="formErrors['password']['error']" 
                    class="text-red-500 mt-2"
                >
                    {{ formErrors['password']['message']
                 }}</p> 
        </div>

        <div class="flex gap-2 items-center">
            <Checkbox v-model:model-value="checkbox" :binary="true"/>
            <p class="text-gray-400">Lembrar de mim</p>
        </div>

        <Button type="submit">Entrar</Button>

        <p class="text-gray-400">
            Não tem uma conta? 
            <u class="text-white"><NuxtLink href="./signup">Criar uma conta</NuxtLink></u>
        </p>
    </form>
</template>

<script setup lang="ts">
import Checkbox from 'primevue/checkbox';
import { signInAccount } from '~/http/auth/signInAccount';

    const checkbox = ref(false);

    const form = reactive({
            email: '',
            password: ''
        });
    
    const formErrors = reactive({
        email: {
            error: false,
            message: '',
        },
        password: {
            error: false,
            message: ''
        }
    })
    
    const errors = {
        'Incorrect email or password': () => {
            formErrors.email = {
                error: true,
                message: 'E-mail ou senha incorreto!'
            }

            formErrors.password = {
                error: true,
                message: 'Senha ou email incorreto!'
            }
        },
    }
    
    // TODO: tornar a validateField reutilizável..;
    const onSubmit = async (e: Event) => {
        e.preventDefault();

        let err = false;

        const validateField = (condition: boolean, field: keyof typeof formErrors, message: string) => {
            if(condition) {
                err = true;
                formErrors[field]['error'] = true;
                formErrors[field]['message'] = message;
            } else {
                formErrors[field]['error'] = false;
                formErrors[field]['message'] = '';
            }
        }

        validateField(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/g.test(form.email), 'email', 'E-mail inválido!');
        validateField(!form.password || form.password.length < 8, 'password', 'Senha inválida! Menor que 8 caracteres!');

        if(err) return;

        const res = await signInAccount({
            email: form.email,
            password: form.password
        });

        if(!res?.success) {
            console.log(res)

            const message = res?.message as keyof typeof errors;

            if (errors[message]) {
                errors[message]();
            }
            
            return;
        };

    
        const { token, refreshToken } = res.data;
        console.log(token, refreshToken)
        useRegisterTokens(token, refreshToken, checkbox.value);
        
    }
</script>
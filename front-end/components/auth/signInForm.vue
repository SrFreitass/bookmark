<template>
    <form class="flex flex-col gap-2" @submit="onSubmit">
        <div>
            <p class="mb-2 font-medium">Código do aluno</p>
            <IconField>
                <InputIcon class="pi pi-user"/>
                <InputText
                    :class="`w-full ${formErrors['studentCode']['error'] ? '!border-red-500' : ''}`"
                    placeholder="Seu código de aluno"
                    v-model:model-value="form.studentCode"
                />
            </IconField>
            <p
                    v-if="formErrors['studentCode']['error']"
                    class="text-red-500 mt-2"
            >
                {{ formErrors['studentCode']['message'] }}
            </p>
        </div>

        <div>
            <p class="mb-2 font-medium">Senha</p>
            <IconField>
                <InputIcon class="pi pi-lock"/>
                <InputText
                    :class="`w-full ${formErrors['password']['error'] ? '!border-red-500' : ''}`"
                    type="password"
                    placeholder="Sua senha"
                    v-model:model-value="form.password"
                />
            </IconField>
            <p v-if="formErrors['password']['error']"
                    class="text-red-500 mt-2"
                >
                {{ formErrors['password']['message']}}
            </p>
        </div>

        <div class="my-2 flex gap-2 items-center">
            <Checkbox v-model:model-value="checkbox" :binary="true"/>
            <p class="text-gray-400">Lembrar de mim</p>
        </div>


        <Button type="submit">Entrar</Button>

        <p class="text-gray-400 mt-4">
            Não tem uma conta?
            <NuxtLink class="underline text-green-400">
            Como criar
            </NuxtLink>
        </p>
    </form>
</template>

<script setup lang="ts">
import Checkbox from 'primevue/checkbox';
import { signInAccount } from '~/http/auth/signInAccount';
    const router = useRouter();
    const checkbox = ref(false);

    const form = reactive({
            studentCode: '',
            password: ''
    });

    const formErrors = reactive({
        studentCode: {
            error: false,
            message: '',
        },
        password: {
            error: false,
            message: ''
        }
    })

    const errors = {
        'Incorrect studentCode or password': () => {
          formErrors.studentCode = {
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

        validateField(form.studentCode.length < 7 || form.studentCode.length > 7, 'studentCode', 'Código do aluno inválido!');
        validateField(!form.password || form.password.length < 8, 'password', 'Senha inválida! Menor que 8 caracteres!');

        if(err) return;

        const res = await signInAccount({
            studentCode: form.studentCode,
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
        console.log(token, refreshToken, "TOKENS")
        useRegisterTokens(token, refreshToken, checkbox.value);
        router.push('/');
    }
</script>

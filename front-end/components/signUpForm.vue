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
    const inputs = {
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
        const { formErrors: formErr, containsErrors } = useSignUpValidation(form);
        
        if (containsErrors) {
            formErrors.errors = { ...formErr };
            return;
        }

    };
</script>
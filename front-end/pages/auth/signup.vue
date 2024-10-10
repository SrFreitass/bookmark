<template>
    <div class="w-96 m-auto flex flex-col justify-center gap-4 min-h-screen">
        <Logo :width-logo="48" :height-logo="48" font-size="2xl" class="mb-4"/>

        <div>
            <h2 class="text-2xl font-semibold text-center">Criar uma conta</h2>
            <p class="text-center text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>

        <SignUpForm />

        <!-- <div>
            <InputGroup>
                <InputGroupAddon class="pi pi-user"></InputGroupAddon>
                <InputText 
                    :class="`${formErrors.errors.name.error && '!border-red-500'}`" 
                    placeholder="Seu nome" 
                    v-model:model-value="form.name"
                />
            </InputGroup>
            <p 
                class="text-red-500 mt-2"
                v-if="formErrors.errors.name.error"
            >
                {{ formErrors.errors.name.message }}
            </p>
        </div>

        <div>
            <InputGroup>
                <InputGroupAddon class="pi pi-envelope"></InputGroupAddon>
                <InputText
                    :class="`${formErrors.errors.email.error && '!border-red-500'}`" 
                    placeholder="Seu melhor e-mail" 
                    v-model:model-value="form.email"
                />
            </InputGroup>
            <p 
                class="text-red-500 mt-2"
                v-if="formErrors.errors.email.error"
            >
                {{ formErrors.errors.email.message }}
            </p>
        </div>

        <div>
            <InputGroup>
                <InputGroupAddon class="pi pi-lock"></InputGroupAddon>
                <InputText 
                    :class="`${formErrors.errors.password.error && '!border-red-500'}`"
                    type="password" 
                    placeholder="Sua senha" 
                    v-model:model-value="form.password"
                />
            </InputGroup>
            <p
                class="text-red-500 mt-2" 
                v-if="formErrors.errors.password.error"
            >
                {{ formErrors.errors.password.message }}
            </p>
        </div>

        <div>
            <InputGroup>
                <InputGroupAddon class="pi pi-lock"></InputGroupAddon>
                <InputText 
                    :class="`${formErrors.errors.confirmPassword.error && '!border-red-500'}`"
                    type="password" 
                    placeholder="Confirme sua senha" 
                    v-model:model-value="form.confirmPassword"
                />
            </InputGroup>
            <p class="text-red-500 mt-2" v-if="formErrors.errors.confirmPassword.error">{{ formErrors.errors.confirmPassword.message }}</p>
        </div>

        <Button type="submit">Registrar</Button>
 
        <p class="text-gray-400">Já tenho uma conta? <NuxtLink><u class="text-white">Registrar</u></NuxtLink></p> -->
    </div>
</template>

<script setup lang="ts">
    definePageMeta({
        layout: 'auth'
    });
</script>
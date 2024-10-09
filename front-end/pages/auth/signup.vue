<template>
    <form class="w-96 m-auto flex flex-col justify-center gap-4 min-h-screen">
        <Logo :width-logo="64" :height-logo="64" font-size="3xl" class="mb-4"/>

        <div>
            <h2 class="text-2xl font-semibold text-center">Criar uma conta</h2>
            <p class="text-center text-gray-400">Crie uma conta no Bookmark! Futuros emprestimos necessitaram de cadastro.</p>
        </div>


        <InputGroup>
            <InputGroupAddon class="pi pi-user"></InputGroupAddon>
            <InputText placeholder="Seu nome"/>
        </InputGroup>

        <InputGroup>
            <InputGroupAddon class="pi pi-envelope"></InputGroupAddon>
            <InputText placeholder="Seu melhor e-mail"/>
        </InputGroup>

        <InputGroup>
            <InputGroupAddon class="pi pi-lock"></InputGroupAddon>
            <InputText placeholder="Sua senha"/>
        </InputGroup>

        <InputGroup>
            <InputGroupAddon class="pi pi-lock"></InputGroupAddon>
            <InputText placeholder="Confirme sua senha"/>
        </InputGroup>

        <Button>Registrar</Button>

        <p class="text-gray-400">Já tenho uma conta? <NuxtLink><u class="text-white">Registrar</u></NuxtLink></p>
    </form>
</template>

<script setup lang="ts">
    definePageMeta({
        layout: 'auth'
    })
</script>
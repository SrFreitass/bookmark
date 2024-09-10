<template>
    <main class="min-h-screen flex ">
        <form class="flex flex-col gap-4 w-1/2 max-w-[24rem] m-auto">
            <InputGroup>
                <InputText placeholder="Nome"/>    
            </InputGroup>
            <InputGroup>
                <Select placeholder="Cargo" :options="roles"/>
            </InputGroup>
            <InputGroup>
                <InputText type="email" placeholder="E-mail"/>    
            </InputGroup>
            <InputGroup>
                <InputText type="password" placeholder="Senha"/>
            </InputGroup>    
            <Button label="Criar sua conta"/>
            <p>Já tem uma conta? <NuxtLink href="./login">Entre aqui</NuxtLink></p>
        </form>
    </main>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    const roles = ref([
        "Aluno",
        "Professor",
        "Coodernador",
    ])
</script>
<template>
    <Menu  class="w-80 !rounded-none !border-t-0" :model="nav" />
</template>

<script setup lang="ts">
    const nav = [
        {   
            class: 'mt-5 text-lg px-4',
            icon: 'pi pi-home',
            label: 'Início'
        },
        {   
            class: 'mt-5 text-lg px-4',
            icon: 'pi pi-bookmark',
            label: 'Emprestimos'
        },
        {   
            class: 'mt-5 text-lg px-4',
            icon: 'pi pi-book',
            label: 'Livros'
        },
        {   
            class: 'mt-5 text-lg px-4',
            icon: 'pi pi-users',
            label: 'Usuários'
        },
    ]
</script>
<template>
    <Menu  class="w-80 !rounded-none !border-l-0 !border-t-0" :model="nav" />
</template>

<script setup lang="ts">
    const nav = [
        {   
            class: 'mt-3 text-lg px-4 font-medium',
            icon: 'pi pi-home',
            label: 'Início'
        },
        {   
            class: 'mt-3 text-lg px-4 font-medium',
            icon: 'pi pi-bookmark',
            label: 'Emprestimos',
            url: './borrows'
        },
        {   
            class: 'mt-3 text-lg px-4 font-medium',
            icon: 'pi pi-book',
            label: 'Livros'
        },
        {   
            class: 'mt-3 text-lg px-4 font-medium',
            icon: 'pi pi-users',
            label: 'Usuários'
        },
    ]
</script>
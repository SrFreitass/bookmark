<script setup lang="ts">
import Sidebar from '~/components/sidebar.vue';
</script>

<template>
    <Header/>
    <div class="flex min-h-screen">
        <Sidebar/>
        <main class="p-6 w-full">
            <p>Gerencie todos os usuários da biblioteca</p>
            <h1 class="text-2xl font-semibold">Gerenciar usuários</h1>
            <UsersTable /> 
        </main>
    </div>
</template>
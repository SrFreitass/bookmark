
<template>
    <div>
        <p>Gerencie todos os usuários da biblioteca</p>
        <h1 class="text-2xl font-semibold">Gerenciar usuários</h1>
        <FilterUsers />
        <UsersTable /> 
    </div>
</template>

<script setup lang="ts">

definePageMeta({
    layout: 'admin'
})
</script>
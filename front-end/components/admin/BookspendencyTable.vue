<template>
    <DataTable :value="users"  :rows="10" paginator show-gridlines class="!bg-transparent">
        <Column field="user" header="Usuário"></Column>
        <Column field="book" header="Livro"></Column>
        <Column field="createdAt" header="Data de saída"></Column>
        <Column field="limitDate" header="Data de entrega"></Column>
        <Column field="days" header="Dias de atraso"></Column>
    </DataTable>
</template>

<script setup lang="ts">
    const { users  } = defineProps([
        "users"
    ])
</script>
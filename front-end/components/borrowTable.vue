<template>
    <DataTable :value="borrows" table-style="background: none;" >
        <Column field="user" header="Usuário"></Column>
        <Column field="book" header="Livro"></Column>
        <Column field="category" header="Categoria"></Column>
        <Column field="createdAt" header="Data de saída"></Column>
        <Column field="limitDate" header="Data de entrega"></Column>
    </DataTable>
</template>

<script setup lang="ts">
    const { borrows  } = defineProps([
        "borrows"
    ])
</script>
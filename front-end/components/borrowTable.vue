<template>
    <DataTable :value="borrows"  :rows="10" paginator show-gridlines >
        <Column field="user" header="Usuário"></Column>
        <Column field="book" header="Livro"></Column>
        <Column field="quantity" header="Unid."></Column>
        <Column field="category" header="Categoria"></Column>
        <Column field="createdAt" header="D. saída"></Column>
        <Column field="limitDate" header="D. entrega"></Column>
    </DataTable>
</template>

<script setup lang="ts">
    const { borrows  } = defineProps([
        "borrows"
    ])
</script>
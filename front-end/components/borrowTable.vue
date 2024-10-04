<template>
    <DataTable class="w-full" show-gridlines>
        <Column key="user" header="Usuário"/>
        <Column key="book" header="Livro"/>
        <Column key="quantity" header="Unidades"/>
        <Column key="createdAt" header="D. Saída"/>
        <Column key="limitDate" header="D. Entrega"/>
        <!-- <Column key="limitDate" header="D. Entrega"/> -->
        <Column key="limitDate" header="Status"/>
    </DataTable>    
</template>

<script setup lang="tsx">
</script>
<template>
    <DataTable class="w-full" show-gridlines paginator :value="borrows.list" :rows="15">
        <Column key="user" header="Usuário" field="userName"/>
        <Column key="book" header="Livro" field="bookTitle"/>
        <Column key="quantity" header="Unidades" field="quantity"/>
        <Column key="createdAt" header="D. Saída" field="createdAt"/>
        <Column key="limitDate" header="D. Entrega" field="limitDate"/>
        <!-- <Column key="limitDate" header="D. Entrega"/> -->
        <Column key="borrow" header="Status" field="borrow"/>
    </DataTable>    
</template>

<script setup lang="ts">
import DataTable from 'primevue/datatable';
import type { Reactive } from 'vue';
import type { IBorrow } from '~/models/IBorrow';

  const { borrows } = defineProps<{
      borrows: Reactive<{list: IBorrow[]}>;
  }>()

import { watch } from 'vue';

watch(() => borrows.list, (newList) => {
    newList.forEach((borrow) => {
        if (new Date(borrow.limitDate) < new Date()) {
            borrow.borrow = 'Atrasado';
        } else if (borrow.borrow) {
            borrow.borrow = 'Emprestado';
        }
    });
}, { deep: true });


</script>
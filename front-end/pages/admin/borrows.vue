<template>
    <div>
        <p>Emprestimos</p>
        <h1 class="text-2xl font-semibold">Overview de emprestimos</h1>
        <div class="mt-4">
            <CreateBorrowModal />
        </div>
        <div class="mt-6 flex flex-col gap-4">
            <SearchBorrows/>
            <BorrowTable />
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'admin'
});
import BorrowTable from '~/components/borrowTable.vue';
import CreateBorrowModal from '~/components/createBorrowModal.vue';
import SearchBorrows from '~/components/searchBorrows.vue';
import Sidebar from '~/components/adminSidebar.vue';

</script>
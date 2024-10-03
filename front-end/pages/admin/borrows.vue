<template>
    <Header />
    <div class="flex min-h-screen">
        <Sidebar />
        <main class="p-6 w-full">
            <p>Emprestimos</p>
            <h1 class="text-2xl font-semibold">Overview de emprestimos</h1>
            <div class="mt-4">
                <CreateBorrowModal />
            </div>
            <div class="mt-6">
                <SearchBorrows/>
                <BorrowTable />
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import BorrowTable from '~/components/borrowTable.vue';
import CreateBorrowModal from '~/components/createBorrowModal.vue';
import SearchBorrows from '~/components/searchBorrows.vue';
import Sidebar from '~/components/sidebar.vue';

</script>
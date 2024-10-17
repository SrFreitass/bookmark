<template>
    <div>
        <p>Emprestimos</p>
        <h1 class="text-2xl font-semibold">Overview de emprestimos</h1>
        <div class="mt-4">
            <CreateBorrowModal />
        </div>
        <div class="mt-6 flex flex-col gap-4">
            <SearchBorrows/>
            <BorrowTable :borrows="borrows"/>
        </div>
        <Toast position="bottom-right" />
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
import { getBorrows } from '~/http/borrow/getBorrows';
import type { IBorrow } from '~/models/IBorrow';

const borrows = reactive<{ list: IBorrow[] }>({
    list: [],
});

const fetchBorrows = async () => {
    console.log('fetching borrows');
    const res = await getBorrows();

    if(!res?.success) {
        console.log('error fetching borrows');
        return;
    }

    console.log('borrows fetched');
    console.log(res.data);
    borrows.list = res.data;
}

fetchBorrows();

</script>
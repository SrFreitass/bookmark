<template>
    <div class="flex flex-col min-h-screen">
        <div>
            <p>Acervo</p>
            <h1 class="text-2xl font-semibold">Gerenciar livros</h1>
            <AddNewBookModal />
        </div>
        <SearchBooks class="mt-4"/>
        <BooksGrid :books="books"/>
        <EditBookModal 
            v-if="route.query.editBook" 
            v-on:close="() => router.push('./books')"
        />
        <Toast position="bottom-right"/>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'admin'
})
import Toast from 'primevue/toast';
import SearchBooks from '~/components/searchBooks.vue';
import { getBooks } from '~/http/user/getBooks';
import type { IBook } from '~/models/IBook';

    const books = reactive<{
        list: IBook[],
        total: number
    }>({
        list: [],
        total: 0
    })

    const route = ref(useRoute());
    const router = useRouter();

    const fetchBooks = async () => {
        const res = await getBooks();

        if(!res?.success) return;

        const lastIndex = res.data.length-1;

        console.log(res)

        if(res.data[lastIndex]?.total || res.data[lastIndex]?.total === 0) {
            books.total = res.data[lastIndex].total as number;
            books.list = res.data as IBook[];
            books.list.pop();
        }

    }

    fetchBooks();
</script>

<style lang="css">
    .p-paginator {
        background: transparent !important;
    }
</style>
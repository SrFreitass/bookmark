<template>
    <div class="flex flex-col min-h-screen">
        <div>
            <p>Acervo</p>
            <h1 class="text-2xl font-semibold">Gerenciar livros</h1>
            <AddNewBookModal />
        </div>
        <SearchBooks class="mt-4"/>
        <BooksGrid :books="books"/>
        <Paginator :rows="25" :total-records="120" class="mt-6"/>
        <EditBookModal :book="book" v-if="route.query.editBook" v-on:close="() => router.push('./books')"/>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'admin'
})
import SearchBooks from '~/components/searchBooks.vue';
import Sidebar from '~/components/adminSidebar.vue';
    const book = {
        isbn: '978xxxxxxxxxx',
        title: 'Entendendo algoritmos',
        authors: ['John Doe'],
        category: 'Computação',
        language: 'Português',
        pages: 260,
        publisher: 'Inovatec',
        publishedAt: '2022',
        coverURL: 'https://m.media-amazon.com/images/I/71Vkg7GfPFL._AC_UF1000,1000_QL80_.jpg',
        quantity: 1,
        bookShelf: 5,
    }

    const books: { id: string, title: string; coverURL: string, url: string }[] = [];
    const route = ref(useRoute());
    const router = useRouter();

    for(let i = 0; i < 21; i++) {
        books.push({
            id: 'abc123',
            title: 'Entendendo Algoritmos',
            coverURL: 'https://m.media-amazon.com/images/I/71Vkg7GfPFL._AC_UF1000,1000_QL80_.jpg',
            url: `?editBook=abc123`
        })
    }
</script>

<style lang="css">
    .p-paginator {
        background: transparent !important;
    }
</style>
<template>
    <Header />
    <div class="flex min-h-screen">
        <Sidebar />
        <main class="p-6 w-full">
            <p>Acervo</p>
            <h1 class="text-2xl font-semibold">Gerenciar livros</h1>
            <AddNewBookModal />
            <!-- <NuxtLink href="./add/book">
                <Button class="mt-4 w-48">
                    <i class="pi pi-plus-circle"></i>
                    Adicionar livro
                </Button>
            </NuxtLink> -->
            <SearchBooks class="mt-4"/>
            <BooksGrid :books="books"/>
            <Paginator :rows="25" :total-records="120" class="mt-6"/>
        </main>
    </div>
</template>

<script setup lang="ts">
import SearchBooks from '~/components/searchBooks.vue';
import Sidebar from '~/components/sidebar.vue';
    const books: { id: string, title: string; coverURL: string }[] = [];

    for(let i = 0; i < 21; i++) {
        books.push({
            id: 'abc123',
            title: 'Entendendo Algoritmos',
            coverURL: 'https://m.media-amazon.com/images/I/71Vkg7GfPFL._AC_UF1000,1000_QL80_.jpg'
        })
    }
</script>

<style lang="css">
    .p-paginator {
        background: transparent;
    }
</style>
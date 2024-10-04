<template>
    <Header />
    <div class="flex min-h-screen">
        <Sidebar />
        <main class="p-6 w-full">
            <p>Acervo</p>
            <h1 class="text-2xl font-semibold">Livros</h1>
            <BooksGrid :books="books"/>
        </main>
    </div>
</template>

<script setup lang="ts">
import Sidebar from '~/components/sidebar.vue';
    const books: { id: string, title: string; coverURL: string }[] = [];

    for(let i = 0; i < 25; i++) {
        books.push({
            id: 'abc123',
            title: 'Entendendo Algoritmos',
            coverURL: 'https://m.media-amazon.com/images/I/71Vkg7GfPFL._AC_UF1000,1000_QL80_.jpg'
        })
    }
</script>
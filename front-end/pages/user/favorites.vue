<template>
    <Header />    
    <main class="flex gap-4">
        <UserSidebar/>
        <div class="mt-8">
            <h2 class="text-2xl font-semibold">Livros favoritados</h2>
            <p class="text-gray-400">21 livros favoritados</p>
            <!-- <hr class="border-border"/> -->
            <BooksGrid :books="books" icon-button="pi pi-heart-fill" v-on:click-book="() => console.log('Desfavoritado')" />
        </div>
    </main>
</template>

<script setup lang="ts">
    const books: { id: string, title: string; coverURL: string, url: string }[] = [];

    for(let i = 0; i < 21; i++) {
        books.push({
            id: 'abc123',
            title: 'Entendendo Algoritmos',
            coverURL: 'https://m.media-amazon.com/images/I/71Vkg7GfPFL._AC_UF1000,1000_QL80_.jpg',
            url: `?editBook=abc123`
        })
    }
</script>
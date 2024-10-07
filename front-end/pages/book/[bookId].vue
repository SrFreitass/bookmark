<template>
    <Header/>
    <main class="flex items-center h-[80vh] max-w-[1366px] m-auto ">
        <BookInfo :book="book"/>
    </main>
    <!-- <BookCarousel :label="{ title: 'Livro similares', category: '#' }"/> -->
</template>

<script lang="ts" setup>
import BookCarousel from '~/components/bookCarousel.vue';
import BookInfo from '~/components/bookInfo.vue';
import Header from '~/components/header.vue';

    const book = {
        coverURL: 'https://m.media-amazon.com/images/I/71Vkg7GfPFL._AC_UF1000,1000_QL80_.jpg', 
        title: 'Entendendo algoritmos',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, dignissimos quis? Dolores eaque aliquid reiciendis repellat illo tenetur asperiores aperiam maxime ducimus? Ipsam odit, cum atque tempora fugiat qui et!',
        category: 'Computação',
        authors: ['John Doe', 'Grelo da Silva Neto', 'Fabio Akita'],
        publisher: 'Novatec',
        pages: 250,
        publishedAt: 2022,
        isbn: '978xxxxxxxxxx'
    }
</script>
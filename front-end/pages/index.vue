<script setup lang="ts">
import BookCarousel from '~/components/bookCarousel.vue';
const books: { coverURL: string; title: string; id: string }[] = [];

for(let i = 0; i < 25; i++) {
    books.push({ 
        coverURL: 'https://m.media-amazon.com/images/I/71Vkg7GfPFL._AC_UF1000,1000_QL80_.jpg', 
        id: '1', 
        title: 'Entendendo algoritmos'
     })
}

</script>

<template>
    <BookCarousel :label="{title: 'Romance', category: 'romance'}" :books="books"/>
    <BookCarousel :label="{title: 'Contos', category: 'contos'}" :books="books"/>
    <BookCarousel :label="{title: 'Ficção', category: 'Ficção'}" :books="books"/>
</template>
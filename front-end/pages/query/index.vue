<template>
    <div class="p-8">
        <SearchBooks/>
        <h2 class="text-xl font-semibold mt-4">Resultados para {{ query }}</h2>
        <BooksGrid :books="books"/>
    </div>
</template>

<script setup lang="ts">
    import { RouterLink } from 'vue-router';
    const router = useRouter();
    const query = router.currentRoute.value.query?.q;
    const books: {
        id: string;
        title: string;
        coverURL: string;
        url: string;
    }[]  = [];

    for(let i = 0; i < 25; i++) {
        books.push({
            id: '1a',
            title: 'Design Patterns',
            coverURL: 'https://m.media-amazon.com/images/I/81IGFC6oFmL._AC_UF1000,1000_QL80_.jpg',
            url: ''
        })
    }

</script>
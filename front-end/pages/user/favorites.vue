<template>
    <div class="mt-8">
        <h2 class="text-2xl font-semibold">Livros favoritados</h2>
        <!-- <p class="text-gray-400">21 livros favoritados</p> -->
        <!-- <hr class="border-border"/> -->
        <BooksGrid :books="books" icon-button="pi pi-heart-fill" v-on:click-book="() => console.log('Desfavoritado')" />
    </div>
</template>

<script setup lang="ts">
import { getFavoritesBooks } from '~/http/favorities/getFavoritesBooks';
import { getBookById } from '~/http/user/getBookById';
import type { IBook } from '~/models/IBook';

definePageMeta({
    layout: 'user'
})

const books = reactive<{ list: IBook[] }>({
    list: []
})

const fetchFavorites = async () => {
    const res = await getFavoritesBooks();

    console.log(res);

    if (!res?.success) return;

    console.log(res.data);

    for (const favorite of res.data) {
        const res = await getBookById(favorite.bookId);

        if (!res?.success) return;

        books.list.push(res.data);
    }
}

fetchFavorites();
</script>
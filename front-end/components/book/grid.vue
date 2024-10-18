<template>
    <div class="flex flex-wrap gap-6 mt-4">
        <div v-for="book in books.list" class="flex flex-col max-w-48 gap-2">
            <NuxtLink :href="`/book/${book.id}`">
                <img :src="book.coverURL" :alt="`Capa do livro ${book.title}`" class="w-48 h-64 object-cover rounded-md">
                <h3 class="mt-2 text-gray-100">{{ book.title }}</h3>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Reactive } from 'vue';
import type { IBook } from '~/models/IBook';


const { books } = defineProps<{
    books: Reactive<{
        list: IBook[],
    }>;
}>();
    console.log(books);
</script>
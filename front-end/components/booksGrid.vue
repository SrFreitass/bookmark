<template>
    <div class="flex flex-wrap gap-6 mt-4">
        <div v-for="book in books.list" class="flex flex-col max-w-48 gap-2">
            <NuxtLink :href="`?editBook=${book.id}`">
                <img :src="book.coverURL" :alt="`Capa do livro ${book.title}`" class="w-48 h-64 object-cover rounded-md">
                <p class="text-end"><i v-if="iconButton && onClickBook" :class="iconButton" class="absolute -ml-10 -mt-10 text-3xl text-green-400" @click="onClickBook"></i></p>
                <h3 class="mt-2 text-gray-100">{{ book.title }}</h3>
            </NuxtLink>
        </div>
    </div>
    <Paginator :totalRecords="books.total" :rows="5" />
</template>

<script setup lang="ts">
import type { Reactive } from 'vue';
import type { IBook } from '~/models/IBook';


const { books, iconButton, onClickBook } = defineProps<{
    books: Reactive<{
        list: IBook[],
        total: number
    }>;
    iconButton?: string;
    onClickBook?: () => void;
}>();
    console.log(books);
</script>
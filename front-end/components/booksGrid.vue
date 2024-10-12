<template>
    <div class="flex flex-wrap gap-6 mt-4">
        <div v-for="book in books" class="flex flex-col max-w-48 gap-2">
            <NuxtLink :href="book.url">
                <img :src="book.coverURL" :alt="`Capa do livro ${book.title}`" class="w-48 h-64 object-cover rounded-md">
                <p class="text-end"><i v-if="iconButton && onClickBook" :class="iconButton" class="absolute -ml-10 -mt-10 text-3xl text-green-400" @click="onClickBook"></i></p>
                <h3 class="mt-2 text-gray-100">{{ book.title }}</h3>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
    const { books, iconButton, onClickBook } = defineProps<{
        books: {
            id: string;
            title: string;
            coverURL: string;
            url: string;
        }[];
        iconButton?: string;
        onClickBook?: () => void;
    }>();
</script>
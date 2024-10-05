<template>
    <div class="flex flex-wrap gap-8 mt-4">
        <div v-for="book in books" class="flex flex-col max-w-48 gap-2">
            <NuxtLink :href="`./edit/${book.id}`">
                <img :src="book.coverURL" :alt="`Capa do livro ${book.title}`" class="w-48 h-64 object-cover">
                <h3>{{ book.title }}</h3>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
    const { books } = defineProps<{
        books: {
            id: string;
            title: string;
            coverURL: string;
        }[]
    }>();
</script>
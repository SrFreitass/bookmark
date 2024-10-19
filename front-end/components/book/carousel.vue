<template>
    <div class="p-8">
        <h2 class="text-2xl font-semibold mb-4"><NuxtLink :href="`/category/${label.category}`">{{ label.title }}</NuxtLink></h2>
        <Swiper
        :slides-per-view="'auto'"
        :space-between="32"
        >
            <SwiperSlide v-for="book in books" :key="book.id" class="!w-44">
                <NuxtLink :href="`/book/${book.id}`">
                    <img :src="`${book.coverURL}.png`" class="rounded-lg max-w-44 min-h-64" v-if="book.id"/>
                    <p class="text-slate-200 mt-2">{{ book.title }}</p>
                </NuxtLink>
            </SwiperSlide>
        </Swiper>
    </div>
</template>

<script setup lang="ts">

    interface Book {
        id: string;
        title: string;
        coverURL: string;
    }

    const { label } = defineProps<{ label: {
        title: string;
        category: string;
    }, books: Book[] }>()
</script>
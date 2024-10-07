<template>
    <div class="p-8">
        <h2 class="text-2xl font-semibold mb-4"><NuxtLink :href="`/category/${label.category}`">{{ label.title }}</NuxtLink></h2>
        <Swiper
        :slides-per-view="10"
        :spaceBetween="24"
        >
            <SwiperSlide v-for="book in books" :key="book.id">
                <img :src="book.coverURL" class="rounded-lg"/>
                <p class="text-slate-200">{{ book.title }}</p>
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
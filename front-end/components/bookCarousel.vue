<template>
    <div class="p-8">
        <h2 class="text-2xl font-semibold mb-4"><NuxtLink :href="`/category/${label.category}`">{{ label.title }}</NuxtLink></h2>
        <Swiper
        :slides-per-view="'auto'"
        :space-between="32"
        >
            <SwiperSlide v-for="book in books" :key="book.id" class="!w-44">
                <div>
                    <img :src="book.coverURL" class="rounded-lg max-w-44"/>
                    <p class="text-slate-200">{{ book.title }}</p>
                </div>
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
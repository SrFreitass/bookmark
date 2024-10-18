
<!-- TODO: REFACTOR COMPONENT -->
<template>
  <div class="flex gap-8 max-lg:flex-col">
    <div class="max-md:flex max-md:justify-center">
      <img :src="book.coverURL" class="w-96 rounded-lg" />
    </div>
    <div class="flex flex-col items-start gap-6 w-full">
      <div class="flex flex-col w-full">
        <div
          class="flex w-full items-center justify-between max-md:flex-col max-md:items-start max-md:gap-4"
        >
          <div class="flex items-center justify-between">
            <h1 class="text-4xl font-semibold">{{ book.title }}</h1>
            <div class="flex gap-4">
              <button @click="() => favoriteBook(book?.id)">
                <i :class="`pi ${isFavorite ? 'pi-heart-fill text-green-500' : 'pi-heart'} text-2xl`"></i>
              </button>
              <i class="pi pi-share-alt text-2xl"></i>
            </div>
          </div>
          <div class="mt-1">
            <NuxtLink
              v-for="(author, i) in book.authors"
              :href="`/query?author=${author}`"
              class="text-gray-400 hover:text-green-500 transition-all"
            >
              {{ author }}{{ i < book.authors.length - 1 ? ", " : "" }}
            </NuxtLink>
          </div>
        </div>
        <div class="mt-1">
          <NuxtLink
            v-for="(author, i) in book.authors"
            :href="`/query?author=${author}`"
            class="text-gray-400 hover:text-green-500 transition-all"
          >
            {{ author }}{{ i < book.authors.length - 1 ? ", " : "" }}
          </NuxtLink>
        </div>
      </div>
      <p>{{ book.description }}</p>
    </div>
  </div>
  <div class="flex flex-col w-full gap-5 mt-5">
    <hr class="border-border w-full" />
    <div class="flex gap-8 flex-wrap w-full">
      <div class="flex-grow" v-for="prop in bookProperties">
        <label class="text-gray-400">{{ prop.label }}</label>
        <NuxtLink v-if="prop.link" :href="prop.link">
          <p class="text-green-500 underline">
            {{ prop.value }}
          </p></NuxtLink
        >
        <p v-if="!prop.link">{{ prop.value }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { favoriteBook } from '~/http/favorities/favoriteBook';
import { getFavoriteBook } from '~/http/favorities/getFavoriteBook';
const isFavorite = ref(false);
const { book } = defineProps<{
  book: any;
}>();
const bookProperties = [
  { label: "Editora", value: book.publisher },
  { label: "Ano de publicação", value: book.publishedAt },
  { label: "Páginas", value: book.pages },
  { label: "ISBN", value: book.isbn },
  { label: "Categoria", value: book.category, link: "?q" },
];

const fetchFavoriteStatus = async (): Promise<void> => {
  const res = await getFavoriteBook(book.id);
  console.log(res);

  if(!res?.success) return;

  isFavorite.value = true;
};

fetchFavoriteStatus();
</script>

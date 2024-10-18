<template>
  <div class="flex gap-8">
    <div>
      <img :src="book.coverURL" class="w-96 rounded-lg" />
    </div>
    <div class="w-2/3 flex flex-col items-start gap-6 justify-between">
      <div class="w-full">
        <div class="flex flex-col flex-grow">
          <div class="flex items-center justify-between">
            <h1 class="text-4xl font-semibold">{{ book.title }}</h1>
            <div class="flex gap-4">
              <button><i class="pi pi-heart text-2xl"></i></button>
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
        <p class="mt-5">{{ book.description }}</p>
      </div>
    </div>
  </div>
  <div class="flex flex-col w-full gap-5 mt-5">
    <hr class="border-border w-full" />
    <div class="flex gap-8 w-full items-center">
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
</script>

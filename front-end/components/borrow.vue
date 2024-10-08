<template>
  <div class="flex gap-4 p-4 hover:outline outline-border rounded-md">
    <img :src="book.coverURL" width="150"/>
    <div class="flex flex-col gap-2">
      <h2 class="text-xl font-semibold">{{ book.title }}</h2>
      <p v-for="author in book.authors" class="text-lg font-medium">{{ author }}</p>
      <div class="flex gap-4">
        <div>
          <label class="text-gray-400">Data de emprestimo</label>
          <p class="font-medium">{{ book.initialDate }}</p>
        </div>
        <div>
          <label class="text-gray-400">Data de entrega</label>
          <p class="font-medium" >{{ book.timeLeft }} dias</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="tsx">
  interface Book {
    coverURL: string; 
    title: string;
    authors: string[];
    initialDate: string;
    timeLeft: number;
  }

  const { book } = defineProps<{
    book: Book;
  }>() 

</script>

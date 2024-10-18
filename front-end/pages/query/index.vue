<template>
  <div class="p-8">
    <BookSearch @change="onChange" />
    <h2 class="text-xl font-semibold mt-4">Resultados para {{ route.query.q }}</h2>
    <BookGrid :books="books" />
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import { getBooksByTitle } from "~/http/book/getBooksByTitle";
import type { IBook } from "~/models/IBook";
const router = useRouter();
const route = ref(useRoute());
const books = reactive<{ list: IBook[] }>({
    list: [],
 });


const queryBooks = async (query = route.value.query.q) => {
  if(!query) return;

  const res = await getBooksByTitle(query as string);

  console.log(res);

  if(!res?.success) return;

  books.list = res.data;
};

const onChange = async (e: Event) => {
  const target = e.target as HTMLInputElement
  router.push({ query: { q: target.value } });

  await queryBooks(target.value);
};

queryBooks();
</script>

<template>
  <main
    class="flex flex-col max-w-[80rem] justify-center min-h-[80vh] max-lg:mx-10 m-auto"
  >
    <button class="flex gap-2 items-center justify-start mb-8 cursor-pointer" @click="router.back()">
      <i class="pi pi-arrow-left"></i>
      <p>Voltar</p>
    </button>
    <BookInfo :book="book" />
  </main>
  <BookCarousel
    class="max-w-[85rem] m-auto p-0"
    :label="{ category: '', title: 'Livro similares' }"
    :books="booksRelated.list"
  />
  <!-- <BookCarousel :label="{ title: 'Livro similares', category: '#' }"/> -->
</template>

<script lang="ts" setup>
import { getBooksByCategory } from '~/http/book/getBooksByCategory';
import { getBookById } from '~/http/user/getBookById';
import type { IBook } from '~/models/IBook';

  const route = ref(useRoute());
  const router = useRouter();

  const book = reactive<{ item: IBook }>({
    item: {
      id: route.value.params.bookId as string,
      isbn: "",
      title: "",
      authors: "",
      description: "",
      coverURL: "",
      pages: 0,
      category: "",
      publisher: "",
      publishedAt: "",
      language: "",
      quantity: 0,
    }
  });

  const booksRelated = reactive<{ list: IBook[] }>({
    list: []
  })

  const fetchBook = async () => {
    const res = await getBookById(book.item.id);

    if(!res?.success) return router.push("/404");

    book.item = res.data;
  };

  const fetchBooksRelated = async () => {
    const res = await getBooksByCategory(book.item.category);

    if(!res?.success) return;

    booksRelated.list = res.data.filter((bookR) => bookR.id !== book.item.id);
  }

  fetchBook();
  fetchBooksRelated();
</script>

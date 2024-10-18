<template>
  <div class="flex flex-col min-h-screen">
    <div>
      <p>Acervo</p>
      <h1 class="text-2xl font-semibold">Gerenciar livros</h1>
      <AdminAddBookModal />
    </div>
    <BookSearch class="mt-4" @change="onSearch" @filter="onFilter" />
    <AdminBookGrid :books="books" @change-page="onChangePage" />
    <AdminEditBookModal
      v-if="route.query.editBook"
      v-on:close="() => router.push('./books')"
    />
    <Toast position="bottom-right" />
  </div>
</template>

<script setup lang="ts">
import { getBooksByTitle } from '~/http/book/getBooksByTitle';
import { getBooks } from '~/http/user/getBooks';
import type { IBook } from '~/models/IBook';

definePageMeta({
  layout: "admin",
});
const books = reactive<{
  list: IBook[];
  total: number;
  filterActive: string;
}>({
  list: [],
  total: 0,
  filterActive: "",
});

const route = ref(useRoute());
const router = useRouter();

const fetchBooks = async () => {
  const res = await getBooks();

  if (!res?.success) return;

  const lastIndex = res.data.length - 1;

  console.log(res);

  if (res.data[lastIndex]?.total || res.data[lastIndex]?.total === 0) {
    books.total = res.data[lastIndex].total as number;
    books.list = res.data as IBook[];
    books.list.pop();
  }
};

fetchBooks();

const onChangePage = async (e: { page: number }) => {
  if (books.filterActive === "BORROW") {
    await getBooks(e.page + 1, { borrow: true });
    return;
  }

  if (books.filterActive === "CLUB") {
    await getBooks(e.page + 1, { club: true });
    return;
  }

  await getBooks(e.page + 1);
};

const onSearch = async (e: Event) => {
  const target = e.target as HTMLInputElement;

  if (!target.value) {
    fetchBooks();
    return;
  }

  const res = await getBooksByTitle(target.value);

  if (!res?.success) return;

  books.list = res.data;
};

const onFilter = async (type: string) => {
  if (type === "Resetar filtro") {
    fetchBooks();
    return;
  }

  if (type === "Emprestados") {
    const res = await getBooks(1, { borrow: true });

    if (!res?.success) return;

    books.total = res.data[res.data.length - 1].total as number;
    books.list = res.data;
    books.list.pop();
    return;
  }

  if (type === "Clube do livro") {
    const res = await getBooks(1, { club: true });

    if (!res?.success) return;

    books.total = res.data[res.data.length - 1].total as number;
    books.list = res.data;
    books.list.pop();
    return;
  }
};
</script>

<style lang="css">
.p-paginator {
  background: transparent !important;
}
</style>

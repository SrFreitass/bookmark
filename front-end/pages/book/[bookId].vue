<template>
  <main
    class="flex flex-col max-w-[1600px] justify-center h-[80vh] mx-32 m-auto"
  >
    <div class="flex gap-2 items-center mb-8">
      <i class="pi pi-arrow-left"></i>
      <p>Voltar</p>
    </div>
    <BookInfo :book="book" />
  </main>
  <BookCarousel
    class="max-w-[1600px] m-auto p-0"
    :label="{ category: '', title: 'Livro similares' }"
    :books="books"
  />
  <!-- <BookCarousel :label="{ title: 'Livro similares', category: '#' }"/> -->
</template>

<script lang="ts" setup>
const books: {
  id: string;
  title: string;
  coverURL: string;
}[] = [];

for (let i = 0; i < 25; i++) {
  books.push({
    id: "2b",
    coverURL:
      "https://m.media-amazon.com/images/I/81IGFC6oFmL._AC_UF1000,1000_QL80_.jpg",
    title: "Design Patterns: Elements of Reusable Object Oriented Software",
  });
}

const book = {
  coverURL:
    "https://m.media-amazon.com/images/I/71Vkg7GfPFL._AC_UF1000,1000_QL80_.jpg",
  title: "Entendendo algoritmos",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, dignissimos quis? Dolores eaque aliquid reiciendis repellat illo tenetur asperiores aperiam maxime ducimus? Ipsam odit, cum atque tempora fugiat qui et!",
  category: "Computação",
  authors: ["John Doe", "Grelo da Silva Neto", "Fabio Akita"],
  publisher: "Novatec",
  pages: 250,
  publishedAt: 2022,
  isbn: "978xxxxxxxxxx",
};
</script>

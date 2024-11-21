<template>
  <div class="flex flex-col gap-4">
    <div class="mt-4" />
    <UsersBorrow :book="book" v-for="book in userBorrows"/>
  </div>
</template>

<script setup lang="ts">
import { getUserBorrows } from '~/http/borrow/getUserBorrows';

definePageMeta({
  layout: "user",
});


const exampleBook = {
  title: "Design patterns",
  authors: ["Joh Doe"],
  initialDate: "04-09-2024",
  timeLeft: 5,
  coverURL:
    "https://m.media-amazon.com/images/I/81IGFC6oFmL._AC_UF1000,1000_QL80_.jpg",
};

const userBorrows = ref<{
    coverURL: string;
    title: string;
    authors: string[];
    initialDate: string;
    timeLeft: number;
  }[]>([]);

const fetchUserBorrows = async () => {
  const res = await getUserBorrows("2024-01-01", "2030-01-01");

  if (!res?.success) return;

  /* coverURL: string;
  title: string;
  authors: string[];
  initialDate: string;
  timeLeft: number; */
  res.data.forEach((borrow) => {
    const timeLeft = Math.floor(
      (new Date(borrow.limitDate).getTime() - new Date().getTime()) /
        (1000 * 60 * 60 * 24)
    );


    userBorrows.value.push({
      coverURL: borrow.coverURL,
      title: borrow.bookTitle,
      authors: borrow.authors,
      initialDate: new Date(borrow.createdAt).toLocaleString('pt-BR'),
      timeLeft,
    });
  })

  console.log(userBorrows.value);



  console.log(res.data)

}

fetchUserBorrows();

</script>

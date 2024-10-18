<template>
  <div class="flex flex-col gap-4">
    <UsersBorrow :book="exampleBook" class="mt-8" />
    <UsersBorrow :book="exampleBook" />
    <UsersBorrow :book="exampleBook" />
    <UsersBorrow :book="exampleBook" />
    <UsersBorrow :book="exampleBook" />
  </div>
</template>

<script setup lang="ts">
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
</script>

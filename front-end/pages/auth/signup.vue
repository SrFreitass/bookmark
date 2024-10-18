<template>
  <Logo :width-logo="48" :height-logo="48" font-size="2xl" class="mb-4" />

  <div>
    <h2 class="text-2xl font-semibold text-center">Criar uma conta</h2>
    <p class="text-center text-gray-400">
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
    </p>
  </div>

  <AuthSignUpForm />
</template>

<script setup lang="ts">
definePageMeta({
  layout: "auth",
});
</script>

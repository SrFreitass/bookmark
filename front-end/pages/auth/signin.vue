<template>
    <div class="bg-zinc-900 p-10 py-12 rounded-xl m-auto w-[30rem] border border-zinc-600">
        <Logo :widthLogo="40" :heightLogo="40" fontSize="xl"/>
        <div class="my-5">
            <h2 class="text-2xl font-semibold text-center">Entrar na sua conta</h2>
            <p class="mt-2 text-center text-gray-400">
                Seja bem-vindo de volta! Faça login para continuar.
            </p>
        </div>

        <AuthSignInForm />
  </div>
</template>

<script lang="ts">
definePageMeta({
  layout: "auth",
});
</script>

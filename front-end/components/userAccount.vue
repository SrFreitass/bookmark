<template>
    <div class="flex flex-col items-start mt-8 w-[80%]">
        <h2 class="text-2xl font-semibold">Detalhes do usuário</h2>
        <hr class="border-border"/>
        <div class="flex gap-4 w-full border-border border p-4 rounded-lg mt-4">
            <img src="https://github.com/srfreitass.png" width="100" height="100" class="rounded-xl object-cover max-h-[6.25rem]" alt="G.F"/>
            <div class="flex flex-col gap-1 mt-4">
                <p class="font-medium">@freitasdev</p>
                <p class="font-medium text-gray-400">Desenvolvedor</p>
            </div>
        </div>
        <div class="border-border border p-4 mt-4 rounded-lg w-full flex flex-col gap-3">
            <h2 class="text-xl font-semibold">Informações pessoais</h2>

            <div class="flex flex-col">
                <label class="text-gray-400">Nome</label>
                <p>Guilherme Freitas</p>
            </div>

            <div class="flex flex-col">
                <label class="text-gray-400">Data de nascimento</label>
                <p>04/04/2001</p>
            </div>

            <div class="flex flex-col">
                <label class="text-gray-400">E-mail</label>
                <p>guilhermefreitasdonascimento67@gmail.com</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>
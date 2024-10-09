<template>
    <Header/>
    <main class="flex gap-4 w-full">
        <UserSidebar/>
        <div class="w-[80%] mt-8">
            <h2 class="text-2xl font-semibold">Notificações</h2>
            <Notification message="Você tem 7 dias pra devolver o entendendo algoritmos" datetime="01/01/2025 às 16h"/>
            <Notification message="Você tem 6 dias pra devolver o entendendo algoritmos" datetime="01/01/2025 às 16h"/>
            <Notification message="Você tem 5 dias pra devolver o entendendo algoritmos" datetime="01/01/2025 às 16h"/>
            <Notification message="Você tem 4 dias pra devolver o entendendo algoritmos" datetime="01/01/2025 às 16h"/>
        </div>
    </main>

</template>

<script setup lang="ts">

</script>
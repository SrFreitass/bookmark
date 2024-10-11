<script setup lang="ts">
    import 'primeicons/primeicons.css';
</script>

<template>
    <Header/>
    <main class="flex gap-4">
        <UserSidebar/>
        <slot/>
    </main>
</template>
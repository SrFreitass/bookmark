<script setup lang="ts">
    import 'primeicons/primeicons.css';
    definePageMeta({
        middleware: 'admin'
    })
</script>

<template>
    <div class="m-auto flex flex-col justify-center gap-4 min-h-screen">
        <slot/>
    </div>
</template>


<template>
    <Header/>
    <div class="flex gap-4 min-h-screen">
        <AdminSidebar />
        <main class="mt-8 w-[80%] mr-4">
            <slot/>
        </main>
    </div>
</template>

<script setup lang="ts">
    import 'primeicons/primeicons.css';
    definePageMeta({
        middleware: 'admin'
    })
</script>
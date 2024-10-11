<script setup lang="ts">
    import AdminSidebar from '~/components/adminSidebar.vue';
    import 'primeicons/primeicons.css';
</script>

<template>
    <Header/>
    <div class="flex gap-4 min-h-screen">
        <AdminSidebar />
        <main class="mt-8 w-[80%]">
            <slot/>
        </main>
    </div>
    
</template>

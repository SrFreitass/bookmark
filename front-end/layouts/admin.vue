
<template>
    <Header/>
    <div class="flex gap-4 min-h-screen">
        <AdminSidebar v-if="isAdmin"/>
        <main class="mt-8 w-[80%] mr-4">
            <slot v-if="isAdmin" />
        </main>
    </div>
</template>

<script setup lang="ts">
    import 'primeicons/primeicons.css';
    definePageMeta({
        middleware: 'admin'
    })

    const isAdmin = ref(false);
   
   const user = useGlobalState();
   if (user.value.user?.role === 'ADMIN' || user.value.user?.role === 'LIBRARIAN') {
        isAdmin.value = true;
   }
</script>
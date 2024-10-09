<template>
    <Header/>
    <div class="flex gap-4 min-h-screen">
        <AdminSidebar />
        <main class="mt-8 w-[80%]">
            <slot/>
        </main>
    </div>
    
</template>

<script>
import AdminSidebar from '~/components/adminSidebar.vue';
import Sidebar from '~/components/adminSidebar.vue';


</script>
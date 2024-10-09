<template>
    <div class="flex items-start">
        <header class="w-[100%] flex items-center justify-between p-6 border-[#5454547a] border-b">
            <Logo :width-logo="32" :height-logo="32" font-size="xl" />
            <nav>
                <ul class="flex items-center gap-4">
                    <li><span class="pi pi-home"></span></li>
                    <li><span class="pi pi-bell"></span></li>
                    <li><span class="pi pi-search" @click="changeStatusSidebar"></span></li>
                    <li>
                        <UserOptions
                            :avatar="'https://github.com/srfreitass.png'"
                            :username="'Freitasdev'"
                            :role="'Estudante'"
                        />
                    </li>
                </ul>
            </nav>
        </header>
        <Searchbar v-if="sidebarStatus" :change-status-sidebar="changeStatusSidebar"/>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import 'primeicons/primeicons.css'
    import UserOptions from './userOptions.vue';
    const sidebarStatus = ref(false);

    const changeStatusSidebar = () => {
        sidebarStatus.value = !sidebarStatus.value;
    }

    const items = ref([
        {
            label: 'Home',
        },
        {
            label: ''
        }
    ])
</script>
<template>
    <div class="flex items-start">
        <header class="w-[100%] flex items-center justify-between p-6 border-[#5454547a] border-b">
            <Logo :width-logo="32" :height-logo="32" font-size="xl" />
            <nav>
                <ul class="flex items-center gap-4">
                    <li><NuxtLink href="/"><span class="pi pi-home"></span></NuxtLink></li>
                    <li><NuxtLink href="/user/notifications"><span class="pi pi-bell"></span></NuxtLink></li>
                    <li><NuxtLink href="/query"><span class="pi pi-search"></span></NuxtLink></li>
                    <li>
                        <UserOptions
                            v-if="globalState.user"
                            :avatar="globalState.user?.avatarURL || 'https://via.placeholder.com/64'"
                            :username="globalState.user?.name || ''"
                            :role="globalState.user?.role === 'STUDENT' ? 'Aluno' : 'Funcionário'"
                        />
                        <NuxtLink href="/auth/signin" class="transition-all border border-green-500 p-2 px-5 rounded-lg hover:bg-green-500" v-else>Entrar</NuxtLink>
                    </li>
                </ul>
            </nav>
        </header>
        <Searchbar v-if="sidebarStatus" :change-status-sidebar="changeStatusSidebar"/>
    </div>
</template>

<script setup lang="ts">
    import 'primeicons/primeicons.css';
import { ref } from 'vue';
import UserOptions from './userOptions.vue';
    const sidebarStatus = ref(false);

    const globalState = useGlobalState()

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
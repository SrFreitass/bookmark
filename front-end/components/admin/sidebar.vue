<template>
    <Menu  class="w-80 !rounded-none !border-l-0 !border-t-0" :model="nav" >
        <template #item="{item, props}">
            <div class="flex gap-4 items-center p-1 text-[#a1a1aa] hover:text-white">
                <i :class="item.icon"></i>
                <NuxtLink :href="item.url">
                    <p>{{ item.label }}</p>
                </NuxtLink>
            </div>
        </template>
    </Menu>
</template>

<script setup lang="ts">
    const nav = [
        {
            label: 'Dashboard',
            items: [
                {  
                    class: 'mt-3 text-lg px-4 font-medium',
                    icon: 'pi pi-home',
                    label: 'Início',
                    url: '/admin/dashboard'
                },
                {   
                    class: 'mt-3 text-lg px-4 font-medium',
                    icon: 'pi pi-bookmark',
                    label: 'Emprestimos',
                    url: '/admin/borrows'
                },
                {   
                    class: 'mt-3 text-lg px-4 font-medium',
                    icon: 'pi pi-book',
                    label: 'Livros',
                    url: '/admin/books'
                },
                {   
                    class: 'mt-3 text-lg px-4 font-medium',
                    icon: 'pi pi-users',
                    label: 'Usuários',
                    url: '/admin/users'
                }, 
            ]
        }
    ]
</script>
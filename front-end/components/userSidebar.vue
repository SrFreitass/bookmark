<template>
    <Menu  class="!min-w-80 !rounded-none !border-l-0 !border-t-0" :model="nav" >
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
            label: 'Usuário',
            items: [
                {   
                    class: 'mt-3 text-lg px-4 font-medium',
                    icon: 'pi pi-bookmark',
                    label: 'Emprestimos',
                    url: '/admin/borrows'
                },
                {   
                    class: 'mt-3 text-lg px-4 font-medium',
                    icon: 'pi pi-heart',
                    label: 'Livros favoritados',
                    url: '/admin/books'
                },
                {   
                    class: 'mt-3 text-lg px-4 font-medium',
                    icon: 'pi pi-user',
                    label: 'Minha conta',
                    url: '/admin/users'
                }, 
                {   
                    class: 'mt-3 text-lg px-4 font-medium',
                    icon: 'pi pi-bell',
                    label: 'Notificações',
                    url: '/admin/users'
                }, 
            ]
        }
    ]
</script>
<template>
    <img src="https://github.com/srfreitass.png" aria-controls="overlay_options"  width="32" height="32" class="rounded-md cursor-pointer" @click="toggle" />
    <Menu ref="menu" popup :model="userOptions" class="!mt-4">
        <template #start>
            <div class="flex justify-between gap-2 p-4">
                <div class="flex gap-3">
                    <img src="https://github.com/srfreitass.png" aria-controls="overlay_options"  width="48" height="48" class="rounded-md cursor-pointer max-h-12 max-w-12" @click="toggle" />
                    <div>
                        <h2 class="text-white">{{ username }}</h2>
                        <p class="text-gray-400">{{ role }}</p>
                    </div>
                </div>
                <i class="pi pi-times" @click="toggle"</i>
            </div>
        </template>
        <template #item="{ item, props }">
            <div class="flex gap-2 items-center p-3 w-64">
                <i :class="item.icon"></i>
                <p>{{ item.label }}</p>
            </div>
        </template>
    </Menu>
</template>

<script setup lang="ts">
    const { username, role, avatar } = defineProps<{
        username: string;
        role: string;
        avatar: string
    }>()
    const menu = ref();
    const userOptions = [
        {
            icon: 'pi pi-bookmark',
            label: 'Emprestimos'
        },
        {
            icon: 'pi pi-heart',
            label: 'Livros favoritados'
        },
        {
            icon: 'pi pi-user',
            label: 'Minha conta'
        },
        {
            icon: 'pi pi-bell',
            label: 'Notificações'
        }
    ]

    const toggle = (e: Event) => {
        menu.value.toggle(e);
    }
</script>
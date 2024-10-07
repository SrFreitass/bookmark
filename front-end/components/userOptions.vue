<template>
    <img src="https://github.com/srfreitass.png" aria-controls="overlay_options"  width="32" height="32" class="rounded-md cursor-pointer" @click="toggle" />
    <Menu ref="menu" popup :model="userOptions" class="!mt-4"/>
</template>

<script setup lang="ts">
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
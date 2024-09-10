<template>
    <header>
        <Menubar :model="items">
            <template #item="{item, hasSubmenu, props, root}">
                <span>{{ item.label  }}</span>
            </template>

            <template #end>
                <InputText placeholder="Pesquisar livros"/>
                <Avatar label="F"/>
            </template>
        </Menubar>
    </header>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    const items = ref([
        {
            label: 'Home',
        },
        {
            label: ''
        }
    ])
</script>
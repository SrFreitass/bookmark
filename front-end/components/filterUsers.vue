<template>
    <InputGroup class="mt-4">
        <InputGroupAddon>
            <i class="pi pi-filter" @click="toggle" aria-controls="overlay_options" aria-haspopup="true"></i>
        </InputGroupAddon>
        <InputText placeholder="Pesquisar usuário ou nome"/>
    </InputGroup>
    <Menu ref="menu" :popup="true" id="overlay_options" :model="filterOptions" class="!mt-5 -ml-3" />
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    const menu = ref();

    const toggle = (e: Event) => {
        menu.value.toggle(e);
    }

    const filterOptions = [
        {
            icon: 'pi pi-exclamation-circle',
            label: 'Devedores'
        },
        {
            icon: 'pi pi-spinner',
            label: 'Pendentes'
        },
    ]

</script>
<template>
    <InputGroup class="mt-4">
        <InputGroupAddon>
            <i class="pi pi-filter" @click="toggle" aria-controls="overlay_options" aria-haspopup="true"></i>
        </InputGroupAddon>
        <InputText placeholder="Pesquisar usuário ou nome" @change="onChange"/>
    </InputGroup>
    <Menu ref="menu" :popup="true" id="overlay_options" :model="filterOptions" class="!mt-5 -ml-3">
        <template #item=item>
            <div class="flex gap-2 items-center p-2" @click="() => onFilter(item.label?.toString() || '')">
                <i :class="item.item.icon+' text-gray-400'"></i>
                <p>{{ item.label }}</p>
            </div>
        </template>
    </Menu>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    const { onFilter, onChange } = defineProps<{
        onChange: (e: Event) => void;
        onFilter: (type: string) => void;
    }>()

    const menu = ref();

    const toggle = (e: Event) => {
        menu.value.toggle(e);
    }

    const filterOptions = [
        {
            icon: 'pi pi-times',
            label: 'Resetar filtro'
        },
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
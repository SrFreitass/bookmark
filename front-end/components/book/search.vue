<template>
    <div>
        <InputGroup>
            <InputGroupAddon>
                <i class="pi pi-bars" @click="toggle"></i>
            </InputGroupAddon>
            <InputText placeholder="Pesquisar livro" @change="onChange" />
        </InputGroup>
        <Menu ref="menu" :popup="true" id="overlay_options" :model="filterOptions" class="!mt-5 -ml-3">
            <template #item=item>
                <div class="flex gap-2 items-center p-2" @click="() => onFilter(item.label?.toString() || '')">
                    <i :class="item.item.icon+' text-gray-400'"></i>
                    <p>{{ item.label }}</p>
                </div>
            </template>
        </Menu>
    </div>
</template>

<script setup lang="ts">
const { onChange, onFilter } = defineProps<{
    onChange: (e: Event) => void;
    onFilter: (type: string) => void;
}>();

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
            icon: 'pi pi-spinner',
            label: 'Emprestados'
        },
        {
            icon: 'pi pi-users',
            label: 'Clube do livro'
        },
    ]
</script>

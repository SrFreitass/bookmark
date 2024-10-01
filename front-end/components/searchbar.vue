<template>
    <aside class="bg-[#18181B] flex flex-col gap-4">
        <InputGroup>
            <InputText placeholder="Título"/>
        </InputGroup>
        <InputGroup>
            <InputText placeholder="ISBN" type="number"/>
        </InputGroup>
        <InputGroup>
            <AutoComplete placeholder="Categoria"  v-model="selectedCategory" :suggestions="categories" @complete="searchCategory"/>
        </InputGroup>
        <InputGroup>
            <InputText placeholder="Autor"/>
        </InputGroup>
        <Select />
        <Select />
    </aside>
</template>

<script setup lang="ts">
    const categoriesArray = [
        "Contos",
        "Poesia",
        "Terror", 
        "Romance",
        "Literatura"
    ]

    const selectedCategory = ref();

    function searchCategory(e: any) {
        if (selectedCategory.value) {
            categories.value = [...categoriesArray]
        }

        categories.value = categories.value.filter((value) => {
            return value.toLowerCase().includes(selectedCategory.value.toLowerCase());
        })
        // selectedCategory.value
    }

    const categories = ref([
        ...categoriesArray
    ])
</script>
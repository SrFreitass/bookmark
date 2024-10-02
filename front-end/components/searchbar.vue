<template>
    <aside class="bg-[#18181B] flex flex-col gap-4 w-1/4 fixed right-0 p-6 h-screen">
        <div class="flex items-center justify-between gap-4">
            <h2 class="text-xl font-semibold">Pesquisar livros</h2>
            <span class="pi pi-times" @click="props.changeStatusSidebar"></span>
        </div>
        <InputGroup>
            <InputText placeholder="Título"/>
        </InputGroup>
        <InputGroup class="items-center gap-2">
            <Checkbox/>
            <label>Incluir livros do clube do livro?</label>
        </InputGroup>
        <InputGroup class="flex-col gap-2">
            <label>Categorias</label>
            <MultiSelect class="!w-full" :options="categoriesArray" placeholder="Selecionar categorias"/>
        </InputGroup>

        <InputGroup class="flex-col gap-2">
            <label>Linguagem</label>
            <MultiSelect class="!w-full" :options="categoriesArray" placeholder="Selecionar Linguagem"/>
        </InputGroup>

        <InputGroup class="flex-col gap-2">
            <label>Ano de publicação</label>
            <MultiSelect class="!w-full" :options="categoriesArray" placeholder="Selecionar Linguagem"/>
        </InputGroup>

        <InputGroup class="flex-col gap-2">
            <label>Editora</label>
            <InputText class="!w-full" placeholder="Pesquisar editora"/>
        </InputGroup>
      
        <div>
            <h2 class="text-xl font-semibold">Filtros aplicados</h2>
            <div class="flex gap-4 flex-wrap">
                <p class="mt-4 bg-[#fafafa] text-[#1e1e1e] rounded-2xl p-1 px-4 text-center font-semibold">Romance</p>
                <p class="mt-4 bg-[#fafafa] text-[#1e1e1e] rounded-2xl p-1 px-4 text-center font-semibold">Machado de Assis</p>
                <p class="mt-4 bg-[#fafafa] text-[#1e1e1e] rounded-2xl p-1 px-4 text-center font-semibold">Português</p>
            </div>
        </div>
    </aside>
</template>

<script setup lang="ts">
    import 'primeicons/primeicons.css'

    const props = defineProps(['sidebarStatus', "changeStatusSidebar"])

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
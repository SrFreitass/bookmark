<template>
    <aside class="bg-[#18181B] flex flex-col gap-4 w-1/4 fixed right-0 p-6 h-screen animate-open-sidebar">
        <div class="flex items-center justify-between gap-4">
            <h2 class="text-xl font-semibold">Pesquisar livros</h2>
            <span class="pi pi-times" @click="props.changeStatusSidebar"></span>
        </div>
        <InputGroup>
            <InputText placeholder="Título"/>
        </InputGroup>
        <InputGroup class="items-center gap-2">
            <Checkbox v-model="form.cl" binary/>
            <label>Incluir livros do clube do livro?</label>
        </InputGroup>
        <InputGroup class="flex-col gap-2">
            <label>Categorias</label>
            <MultiSelect class="!w-full" :options="categoriesArray" v-model:model-value="form.categories" placeholder="Selecionar categorias"/>
        </InputGroup>

        <InputGroup class="flex-col gap-2">
            <label>Linguagem</label>
            <MultiSelect class="!w-full" :options="languages" v-model:model-value="form.languages" placeholder="Selecionar Linguagem" />
        </InputGroup>

        <InputGroup class="flex-col gap-2">
            <label>Ano de publicação</label>
            <MultiSelect class="!w-full" :options="years" v-model:model-value="form.years" placeholder="Selecionar Linguagem"/>
        </InputGroup>

        <InputGroup class="flex-col gap-2">
            <label>Editora</label>
            <InputText class="!w-full" placeholder="Pesquisar editora" v-model:model-value="form.publisher"/>
        </InputGroup>
      
        <div>
            <h2 class="text-xl font-semibold">Filtros aplicados</h2>
            <div class="flex gap-x-2 flex-wrap">
                <p v-for="category in form.categories" class="mt-4 bg-[#fafafa] text-[#1e1e1e] rounded-2xl p-1 px-4 text-center font-semibold">{{ category }}</p>
                <p v-for="lang in form.languages" class="mt-4 bg-[#fafafa] text-[#1e1e1e] rounded-2xl p-1 px-4 text-center font-semibold">{{ lang }}</p>
                <p v-if="form.publisher" class="mt-4 bg-[#fafafa] text-[#1e1e1e] rounded-2xl p-1 px-4 text-center font-semibold">{{ form.publisher }}</p>
                <p v-for="year in form.years" class="mt-4 bg-[#fafafa] text-[#1e1e1e] rounded-2xl p-1 px-4 text-center font-semibold">{{ year }}</p>
            </div>
        </div>
    </aside>
</template>

<script setup lang="ts">
    import 'primeicons/primeicons.css'
import Checkbox from 'primevue/checkbox';

    const props = defineProps(['sidebarStatus', "changeStatusSidebar"])

    const languages = [
        "Português",
        "Inglês",
        "Espanhol",
    ];

    const selectedLanguages = ref([]);
    const form = reactive({
        cl: false,
        publisher: '',
        years: [],
        categories: [],
        languages: [],
    })

    const years: number[] = [];

    for(let i = new Date().getFullYear(); i >= 1800; i--) {
        years.push(i);
    }

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
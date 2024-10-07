<template>
    <aside class="bg-[#18181B] flex flex-col gap-4 w-1/4 fixed right-0 p-6 h-screen animate-open-sidebar">
        <div class="flex items-center justify-between gap-4">
            <h2 class="text-xl font-semibold">Pesquisar livros</h2>
            <span class="pi pi-times" @click="props.changeStatusSidebar"></span>
        </div>
        <InputGroup>
            <InputGroupAddon>
                <i aria-haspopup="true" @click="toggle" aria-controls="overlay_options" class="pi pi-bars"  > </i>
            </InputGroupAddon>
            <Menu ref="menu" id="overlay_options" :model="searchOptions" class="!mt-5 -ml-3" :popup="true">
                <template #item="{ item, props }">
                    <div class="flex gap-2 items-center p-2">
                        <i :class="`${item.icon}`"></i>
                        <p>{{ item.label }}</p>
                    </div>
                </template>
            </Menu>
            <InputText placeholder="Título"/>
        </InputGroup>
       <!-- <Accordion value="0">
            <AccordionPanel value="0">
                <AccordionHeader>
                    Editora
                </AccordionHeader>
                <AccordionContent>

                </AccordionContent>
            </AccordionPanel>
       </Accordion>
       -->
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
import Menu from 'primevue/menu';

    const props = defineProps(['sidebarStatus', "changeStatusSidebar"])

    const languages = [
        "Português",
        "Inglês",
        "Espanhol",
    ];

    const searchOptions = [
        {
            icon: 'pi pi-bookmark',
            label: 'Título'
        },
        {
            icon: 'pi pi-barcode',
            label: 'ISBN'
        },
        {
            icon: 'pi pi-globe',
            label: 'Editora'
        },
        {
            icon: 'pi pi-sparkles',
            label: 'Categoria'
        }
    ]

    const searchOptionsStatus = ref(false);
    const menu = ref();

    const toggle = (event: Event) => {
        menu.value.toggle(event);
    }

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
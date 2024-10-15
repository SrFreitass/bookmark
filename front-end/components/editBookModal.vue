<template>
    <Dialog :visible="true" modal header="Editar livro">
        <template #closeicon>
            <i class="pi pi-times" @click="onClose"></i>
        </template>
        <div class="flex gap-4">
            <img class="rounded-md" src="https://m.media-amazon.com/images/I/71Vkg7GfPFL._AC_UF1000,1000_QL80_.jpg" alt="" width="500"/>
            <form class="flex flex-col gap-4 w-[30rem]">
                <InputGroup>
                    <InputText placeholder="ISBN" :value="book?.isbn || ''"/>
                </InputGroup>
    
                <InputGroup>
                    <InputText placeholder="Título" :value="book?.title || ''"/>
                </InputGroup>
    
                <InputGroup>
                    <InputText placeholder="Autores" :value="authors || ''"/>
                </InputGroup>

                <InputGroup>
                    <InputText placeholder="Categoria" :value="book?.category || ''"/>
                </InputGroup>
    
                <InputGroup>
                    <InputText placeholder="Editora" :value="book?.publisher || ''"/>
                </InputGroup>
    
                <InputGroup>
                    <Select placeholder="Linguagem" :value="book?.language || ''"/>
                </InputGroup>
    
                <InputGroup>
                    <InputText type="number" placeholder="Ano de edição" :value="book?.publishedAt || ''"/>
                </InputGroup>
    
                
                <InputGroup>
                    <InputText type="number" placeholder="Número de páginas" :value="pages || ''"/>
                </InputGroup>
                
                <InputGroup>
                    <InputText type="number" placeholder="Quantidade" :value="quantity || ''"/>
                </InputGroup>
                
                <!-- <InputGroup>
                    <InputText type="number" placeholder="Prateleira" :value="bookShelf"/>
                </InputGroup> -->
                
                <FileUpload>
                    <template #empty>
                        <h2>Clique em escolher ou arraste a capa</h2>
                    </template>
                </FileUpload>
    
                <Button>Editar livro</Button>
            </form>
        </div>
    </Dialog>
</template>

<script setup lang="ts">
import type { RouteLocationNormalizedLoaded } from 'vue-router';
import { getBookById } from '~/http/user/getBookById';
import type { IBook } from '~/models/IBook';

    const { onClose } = defineProps<{
        onClose: () => void;
    }>();

    const route = ref(useRoute());
    const book = ref<IBook | null>(null);

    const fetchBook = async () => {
        const res = await getBookById(route.value.query.editBook as string);

        if(!res?.success) return;

        console.log(res, "CARALHO");

        book.value = res.data;
    }

    if(route.value.query.editBook) fetchBook();
</script>
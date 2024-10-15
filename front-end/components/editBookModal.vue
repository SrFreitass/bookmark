<template>
    <Dialog :visible="true" modal header="Editar livro">
        <template #closeicon>
            <i class="pi pi-times" @click="onClose"></i>
        </template>
        <div class="flex gap-4">
            <img class="rounded-md" :src="book?.coverURL" alt="" width="500" />
            <form class="flex flex-col gap-4 w-[30rem]">
                <InputGroup>
                    <InputText
                        placeholder="ISBN"
                        v-model:model-value="book.isbn"
                    />
                </InputGroup>

                <InputGroup>
                    <InputText
                        placeholder="Título"
                        v-model:model-value="book.title"
                    />
                </InputGroup>

                <InputGroup>
                    <InputText
                        placeholder="Autores"
                        v-model:model-value="book.authors"
                    />
                </InputGroup>

                <InputGroup>
                    <InputText
                        placeholder="Categoria"
                        v-model:model-value="book.category"
                    />
                </InputGroup>

                <InputGroup>
                    <InputText
                        placeholder="Editora"
                        v-model:model-value="book.publisher"
                    />
                </InputGroup>

                <InputGroup>
                    <Select
                        placeholder="Linguagem"
                        v-model:model-value="book.language"
                        :options="[
                            'Português',
                            'Inglês',
                            'Alemão',
                            'Espanhol',
                            'Francês',
                        ]"
                    />
                </InputGroup>

                <InputGroup>
                    <InputText
                        type="number"
                        placeholder="Ano de edição"
                        v-model:model-value="book.publishedAt"
                    />
                </InputGroup>

                <InputGroup>
                    <InputNumber
                        placeholder="Número de páginas"
                        v-model:model-value="book.pages"
                    />
                </InputGroup>

                <InputGroup>
                    <InputNumber
                        type="number"
                        placeholder="Quantidade"
                        v-model:model-value="book.quantity"
                    />
                </InputGroup>

                <!-- <InputGroup>
                    <InputText type="number" placeholder="Prateleira" :value="bookShelf"/>
                </InputGroup> -->

                <FileUpload>
                    <template #empty>
                        <h2>Clique em escolher ou arraste a capa</h2>
                    </template>
                </FileUpload>

                <Button @click="editBook">Editar livro</Button>
            </form>
        </div>
    </Dialog>
</template>

<script setup lang="ts">
import type { RouteLocationNormalizedLoaded } from "vue-router";
import { getBookById } from "~/http/user/getBookById";
import type { IBook } from "~/models/IBook";

const { onClose } = defineProps<{
    onClose: () => void;
}>();

const route = ref(useRoute());
const book = ref<IBook>({
    id: "",
    isbn: (route.value.query.editBook as string) || "",
    title: "",
    description: "",
    coverURL: "",
    authors: [],
    pages: 0,
    category: "",
    publishedAt: "",
    publisher: "",
    quantity: 0,
    language: "",
});

const bookCopy = ref<IBook>({ ...book.value });

const fetchBook = async () => {
    const res = await getBookById(book.value.isbn);
    console.log("ué!");

    if (!res.success) return;

    console.log(res, "CARALHO");

    book.value = res.data;
    bookCopy.value = {
        ...res.data,
    };

    if (!book.value) return;

    book.value.publishedAt = new Date(book.value?.publishedAt)
        .getFullYear()
        .toString();
};

if (route.value.query.editBook) fetchBook();

const editBook = async () => {
    if (!book.value) return;

    const keys = Object.keys(book.value);

    const propModifieds: Record<string, unknown> = {};

    keys.forEach((key) => {
        if (
            book.value[key as keyof typeof book.value] !=
            bookCopy.value[key as keyof typeof bookCopy.value]
        ) {
            propModifieds[key] = book.value[key as keyof typeof book.value];
        }
    });

    console.log(propModifieds);
};
</script>

<template>
    <Dialog :visible="true" modal header="Editar livro">
        <template #closeicon>
            <i class="pi pi-times" @click="onClose"></i>
        </template>
        <div class="flex gap-4">
            <img class="rounded-md" :src="book?.coverURL" alt="" width="500" />
            <form class="flex flex-col gap-4 w-[30rem]">
                <div>
                    <InputText
                        class="w-full"
                        placeholder="ISBN"
                        v-model:model-value="book.isbn"
                    />
                    <p class="text-red-500 mt-2">
                        {{ bookErrors?.isbn.message }}
                    </p>
                </div>

                <div>
                    <InputText
                        class="w-full"
                        placeholder="Título"
                        v-model:model-value="book.title"
                    />
                    <p class="text-red-500 mt-2">
                        {{ bookErrors?.title.message }}
                    </p>
                </div>

                <div>
                    <InputText
                        class="w-full"
                        placeholder="Autores"
                        v-model:model-value="book.authors"
                    />
                    <p class="text-red-500 mt-2">
                        {{ bookErrors?.authors.message }}
                    </p>
                </div>

                <div>
                    <InputText
                        class="w-full"
                        placeholder="Categoria"
                        v-model:model-value="book.category"
                    />
                    <p class="text-red-500 mt-2">
                        {{ bookErrors?.category.message }}
                    </p>
                </div>

                <div>
                    <InputText
                        class="w-full"
                        placeholder="Editora"
                        v-model:model-value="book.publisher"
                    />
                    <p class="text-red-500 mt-2">
                        {{ bookErrors?.publisher.message }}
                    </p>
                </div>

                <div>
                    <Select
                        class="w-full"
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
                    <p class="text-red-500 mt-2">
                        {{ bookErrors?.language.message }}
                    </p>
                </div>

                <div>
                    <InputText
                        class="w-full"
                        type="number"
                        placeholder="Ano de edição"
                        v-model:model-value="book.publishedAt"
                    />
                    <p class="text-red-500 mt-2">
                        {{ bookErrors?.publishedAt.message }}
                    </p>
                </div>

                <div>
                    <InputNumber
                        class="w-full"
                        :useGrouping="false"
                        type="number"
                        placeholder="Número de páginas"
                        v-model:model-value="book.pages"
                    />
                    <p class="text-red-500 mt-2">
                        {{ bookErrors?.pages.message }}
                    </p>
                </div>

                <div>
                    <InputNumber
                        class="w-full"
                        :useGrouping="false"
                        type="number"
                        placeholder="Quantidade"
                        v-model:model-value="book.quantity"
                    />
                    <p class="text-red-500 mt-2">
                        {{ bookErrors?.quantity.message }}
                    </p>
                </div>

                <!-- <div>
                    <InputText type="number" placeholder="Prateleira" :value="bookShelf"/>
                </div> -->

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
import { updateBookById } from "~/http/user/updateBookById";
import { useEditBookValidation } from "~/composables/useEditBookValidation";

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
    authors: "",
    pages: 0,
    category: "",
    publishedAt: "",
    publisher: "",
    quantity: 0,
    language: "",
});

const bookErrors = ref<Record<
    keyof IBook,
    { message: string; error: boolean }
> | null>(null);

const bookCopy = ref<IBook>({ ...book.value });

const fetchBook = async () => {
    const res = await getBookById(book.value.isbn);
    console.log("ué!");

    if (!res.success) return;

    book.value = res.data;
    book.value.authors = res?.data?.authors.join(",");
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

    const { containsErrors, formErrors } = useEditBookValidation(book.value);

    if (containsErrors) {
        bookErrors.value = formErrors;
        return;
    }

    const keys = Object.keys(book.value);

    const propModifieds: Record<string, unknown> = {};

    keys.forEach((key) => {
        if (
            book.value[key as keyof typeof book.value].toString().trim() !=
            bookCopy.value[key as keyof typeof bookCopy.value]
        ) {
            propModifieds[key] = book.value[key as keyof typeof book.value];
        }
    });

    await updateBookById(book.value.id, propModifieds);
};
</script>

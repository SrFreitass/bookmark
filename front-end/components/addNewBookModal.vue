<template>
    <Button @click="() => (visible = !visible)" class="mt-4">
        Adicionar livro
    </Button>
    <Dialog v-model:visible="visible" modal header="Adicionar um novo livro">
        <div class="flex gap-4">
            <img
                class="rounded-md"
                :src="book.coverURL || '/book-placeholder.jpg'"
                alt=""
                width="500"
            />
            <form class="flex flex-col gap-4 w-[30rem]">
                <div>
                    <InputText
                        :class="`w-full ${bookErrors?.isbn?.error ? '!border-red-500' : ''}`"
                        placeholder="ISBN"
                        v-model:model-value="book.isbn"
                    />
                    <p class="text-red-500 mt-2">
                        {{ bookErrors?.isbn.message }}
                    </p>
                </div>

                <div>
                    <InputText
                        :class="`w-full ${bookErrors?.title?.error ? '!border-red-500' : ''}`"
                        placeholder="Título"
                        v-model:model-value="book.title"
                    />
                    <p class="text-red-500 mt-2">
                        {{ bookErrors?.title.message }}
                    </p>
                </div>

                <div>
                    <InputText
                        :class="`w-full ${bookErrors?.authors?.error ? '!border-red-500' : ''}`"
                        placeholder="Autores"
                        v-model:model-value="book.authors"
                    />
                    <p class="text-red-500 mt-2">
                        {{ bookErrors?.authors.message }}
                    </p>
                </div>

                <div>
                    <Select
                        class="w-full"
                        placeholder="Categoria"
                        v-model:model-value="book.category"
                        :options="Object.keys(categories)"
                    />
                    <p class="text-red-500 mt-2">
                        {{ bookErrors?.category.message }}
                    </p>
                </div>

                <div>
                    <InputText
                        :class="`w-full ${bookErrors?.category?.error ? '!border-red-500' : ''}`"
                        placeholder="Editora"
                        v-model:model-value="book.publisher"
                    />
                    <p class="text-red-500 mt-2">
                        {{ bookErrors?.publisher.message }}
                    </p>
                </div>

                <div>
                    <Select
                        :class="`w-full ${bookErrors?.language?.error ? '!border-red-500' : ''}`"
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
                        :class="`w-full ${bookErrors?.publishedAt?.error ? '!border-red-500' : ''}`"
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
                        :class="`w-full ${bookErrors?.pages?.error ? '!border-red-500' : ''}`"
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
                        :class="`w-full ${bookErrors?.quantity?.error ? '!border-red-500' : ''}`"
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

                <FileUpload
                    mode="basic"
                    :max-file-size="1024 * 1024 * 5"
                    custom-upload
                    @select="(e) => onUpload(e.files)"
                    :file-limit="1"
                >
                </FileUpload>

                <Button @click="onSubmit">Editar livro</Button>
            </form>
        </div>
    </Dialog>
</template>

<script setup lang="ts">
import Select from "primevue/select";
import { uploadCoverBook } from "~/http/user/uploadCoverBook";
import type { IBook } from "~/models/IBook";
import { createBook } from "~/http/book/createBook";
import { getCategories } from "~/http/category/getCategories";
const toast = useToast();

const visible = ref(false);
const categories = ref<Record<string, string>>({});

const fetchCategories = async () => {
    const res = await getCategories();

    if (!res?.success) {
        console.error(res?.message);
        return;
    }

    res.data.map(({ id, name }) => {
        categories.value[name] = id;
    });
};

fetchCategories();

const book = reactive<Omit<IBook, "id"> & { categoryId: string }>({
    isbn: "",
    title: "",
    authors: "",
    categoryId: "",
    category: "",
    publisher: "",
    coverURL: "",
    description: "",
    language: "",
    publishedAt: "0",
    pages: 0,
    quantity: 0,
});

const bookErrors = ref<Record<
    string,
    { error: boolean; message: string }
> | null>();

const onSubmit = async () => {
    if (!book) return;

    const { containsErrors, formErrors } = useEditBookValidation(book);

    if (containsErrors) {
        bookErrors.value = formErrors;
        return;
    }

    const res = await createBook({
        ...book,
        available: book.quantity,
        categoryId: categories.value[book.category],
    });

    if (!res?.success) {
        console.error(res?.message);
        toast.add({
            severity: "error",
            summary: "Erro",
            detail: "Erro ao criar livro",
        });

        return;
    }

    toast.add({
        severity: "success",
        summary: "Sucesso",
        detail: "Livro criado com sucesso",
    });

    visible.value = false;
};

const onUpload = async (files: File[]) => {
    console.log("files", files);

    const res = await uploadCoverBook(files[0], book.title);

    if (!res?.success) {
        console.error(res?.message);
        return;
    }

    book.coverURL = `http://localhost:8080${res.data.cover}`;
};
</script>

<style scoped lang="css">
.p-fileupload-basic {
    justify-content: start;
}
</style>

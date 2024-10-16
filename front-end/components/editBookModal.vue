<template>
    <Dialog :visible="true" modal header="Editar livro">
        <template #closeicon>
            <i class="pi pi-times" @click="onClose"></i>
        </template>
        <div class="flex gap-4">
            <img class="rounded-md" :src="book.coverUrl" alt="" width="500" />
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
                    @select="(e) => onUpload(e.files)" :file-limit="1">
                </FileUpload>

                <Button @click="editBook">Editar livro</Button>
            </form>
        </div>
    </Dialog>
</template>

<script setup lang="ts">
import { getBookById } from "~/http/user/getBookById";
import type { IBook } from "~/models/IBook";
import { updateBookById } from "~/http/user/updateBookById";
import { useEditBookValidation } from "~/composables/useEditBookValidation";
import { uploadCoverBook } from "~/http/user/uploadCoverBook";

const { onClose } = defineProps<{
    onClose: () => void;
}>();

const toast = useToast()
const route = ref(useRoute());
const book = reactive<IBook>({
    id: "",
    isbn: (route.value.query.editBook as string) || "",
    title: "",
    description: "",
    coverUrl: "",
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

const bookCopy = ref<IBook>({ ...book });

const fetchBook = async () => {
    const res = await getBookById(book.isbn);
    console.log("ué!");
    
    // fix this
    book.id = res.data.id;
    book.isbn = res.data.isbn;
    book.title = res.data.title;
    book.description = res.data.description;
    book.coverUrl = res.data.coverURL;
    book.pages = res.data.pages;
    book.category = res.data.category;
    book.publishedAt = res.data.publishedAt;
    book.publisher = res.data.publisher;
    book.quantity = res.data.quantity;
    book.language = res.data.language;

    if (!res.success) return;

    
    book.authors = res?.data?.authors.join(",");
    bookCopy.value = {
        ...res.data,
    };

    if (!book) return;
};

if (route.value.query.editBook) fetchBook();

const editBook = async () => {
    if (!book) return;

    const { containsErrors, formErrors } = useEditBookValidation(book);

    if (containsErrors) {
        bookErrors.value = formErrors;
        return;
    }

    const keys = Object.keys(book);

    const propModifieds: Record<string, unknown> = {};
    let notModified = false;

    keys.forEach((key) => {
        if (
            book[key as keyof typeof book].toString().trim() !=
            bookCopy.value[key as keyof typeof bookCopy.value]
        ) {
            propModifieds[key] = book[key as keyof typeof book];
            notModified = true;
        }
    });

    if (!notModified) return toast.add({ severity: "info", summary: "Info", detail: "Nenhum campo foi modificado" });

    await updateBookById(book.id, propModifieds);

    toast.add({ severity: "success", summary: "Sucesso", detail: "Livro editado com sucesso" });
};

const onUpload = async (e: File[]) => {
    const res = await uploadCoverBook(e[0], book.title);

    if(res) {
        console.log(res);
        book.coverUrl = `http://localhost:8080${res.data.cover}`;
    }

}
</script>

<style lang="css" scoped>
    .p-fileupload-basic {
        justify-content: start
    }
</style>
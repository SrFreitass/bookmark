<template>
    <Button @click="() => visible = !visible" class="mt-4">
        Adicionar livro
    </Button>
    <Dialog v-model:visible="visible" modal header="Adicionar um novo livro">
        <div class="flex gap-4">
            <img class="rounded-md" src="https://m.media-amazon.com/images/I/71Vkg7GfPFL._AC_UF1000,1000_QL80_.jpg" alt="" width="500"/>
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

                <Button @click="createBook">Editar livro</Button>
            </form>
        </div>
    </Dialog>
</template>

<script setup lang="ts">
import Select from 'primevue/select';
import type { IBook } from '~/models/IBook';

    const visible = ref(false);
    const book = reactive<Omit<IBook, 'id'>>({
        isbn: '',
        title: '',
        authors: '',
        category: '',
        publisher: '',
        coverURL: '',
        description: '',
        language: '',
        publishedAt: '0',
        pages: 0,
        quantity: 0,
    })

    const bookErrors: Record<string, { error: boolean, message: string }> = {}

    const createBook = async () => {
        console.log(book)
    }

    const onUpload = async (files: File[]) => {

    }
</script>
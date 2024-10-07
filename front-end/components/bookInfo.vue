<template>
    <div class="flex gap-8">
        <div>
            <img :src="book.coverURL" class="w-96 rounded-lg"/>
        </div>
        <div class="w-2/3 flex flex-col items-start gap-4">
            <h1 class="text-2xl font-semibold">{{ book.title }}</h1>
            <div>
                <NuxtLink v-for="author, i in book.authors" :href="`/query?author=${author}`">
                    {{ author }}{{ i < book.authors.length - 1 ? ', ' : ''  }}
                </NuxtLink>    
            </div>
            <hr class="border-border w-full"/>
            <p>{{ book.description }}</p>
            <div class="flex gap-4">
                <i class="pi pi-heart text-2xl"></i>
                <i class="pi pi-share-alt text-2xl"></i>
            </div>
            <hr class="border-border w-full"/>
            <div class="flex gap-8 w-full">
                <div class="flex-grow">
                    <label class="text-gray-400">Editora</label>
                    <p>{{ book.publisher }}</p>
                </div>
                
                <div class="flex-grow">
                    <label class="text-gray-400">Ano de publicação</label>
                    <p>{{ book.publishedAt }}</p>
                </div>
                
                <div class="flex-grow">
                    <label class="text-gray-400">Páginas</label>
                    <p>{{ book.pages }}</p>
                </div>

                <div class="flex-grow">
                    <label class="text-gray-400">ISBN</label>
                    <p>{{ book.isbn }}</p>
                </div>
            </div>
            <hr class="border-border w-full"/>
            <div class="flex gap-4">
                <p class="bg-[#fafafa] rounded-lg text-black p-2">{{ book.category }}</p>
                <p class="bg-[#fafafa] rounded-lg text-black p-2">Clube do livro</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

    const { book } = defineProps<{
        book: any;
    }>();
</script>''

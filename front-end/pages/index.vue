
<template>
    <BookCarousel v-for="book in books" :books="book.list" :key="book.category" :label="{ title: book.category, category: book.category }" />
</template>

<script setup lang="ts">
import { getBooksByCategory } from '~/http/book/getBooksByCategory';
import { getCategories } from '~/http/category/getCategories';
import type { IBook } from '~/models/IBook';


const books = reactive<{
        list: IBook[],
        category: string
}[]>([]);

const fetchBooks = async () => {
    const res = await getCategories();

    if(!res?.data) return;

    
    for(const { id, name } of res?.data) {
        const res = await getBooksByCategory(id);
        if(!res?.success) return;
        books.push({
            list: res.data,
            category: name,
        });
    }

};

fetchBooks();

</script>
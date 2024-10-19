<template>
    <div>
        <p class="text-gray-400">Todos livros da categoria {{ categoryName }}</p>
        <h2 class="text-xl font-semibold">{{ categoryName }}</h2>
        <Grid :books="books" />
    </div>
</template>

<script setup lang="ts">
import Grid from '~/components/book/grid.vue';
import { getBooksByCategory } from '~/http/book/getBooksByCategory';
import { getCategories } from '~/http/category/getCategories';
import type { IBook } from '~/models/IBook';

    const route = useRoute()
    let categoryName = route.params.category.toString();
    const books = reactive<{ list: IBook[] }>({
        list: []
    });
    // Capitalize
    categoryName = `${categoryName.charAt(0).toUpperCase()}${categoryName.substring(1, categoryName.length)}`;

    const fetchBooks = async () => {
        const res = await getCategories();

        if (!res?.success) return;

        // FIX ME
        const category = res.data.find((cat) => cat.name === categoryName);

        if (!category) return;

        const resBooks = await getBooksByCategory(category.id);

        if (!resBooks?.success) return;

        resBooks.data.pop();
        books.list = resBooks.data; 


    }

    fetchBooks();
</script>
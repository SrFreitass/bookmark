<template>
    <div>
        <p class="text-gray-400">Todos livros da categoria {{ category }}</p>
        <h2 class="text-xl font-semibold">{{ category }}</h2>
    </div>
</template>

<script setup lang="ts">
    const route = useRoute()
    let category = route.params.category.toString();

    // Capitalize
    category = `${category.charAt(0).toUpperCase()}${category.substring(1, category.length)}`;
</script>
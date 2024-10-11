<script setup lang="ts">
import Header from '~/components/header.vue';
import 'primeicons/primeicons.css'
</script>

<template>
    <Header/>
    <div class="p-8">
        <slot/>
    </div>
</template>
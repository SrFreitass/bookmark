<template>
    <div class="mt-4 p-4 border border-border rounded-lg flex flex-col gap-4">
        <div class="flex gap-2 items-center">
            <i class="pi pi-exclamation-circle text-xl"></i>
            <p>{{ message }}</p>
        </div>
        <time class="text-gray-400">{{ datetime }}</time>
    </div>
</template>

<script setup lang="ts">
    const { datetime, message } = defineProps<{
        message: string;
        datetime: string;
    }>()
</script>
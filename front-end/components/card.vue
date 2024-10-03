<template>
    <div class="flex justify-between w-[22rem] h-32 border border-[#5454547a] p-4 rounded-lg mt-6">
        <div>
            <h3 class="text-xl font-semibold">{{ title }}</h3>
            <p class="text-2xl font-semibold mt-2">{{ value  }}</p>
            <p>{{ description  }}</p>
        </div>
        <div class="border border-[#54545471] rounded-xl w-10 h-10 flex justify-center items-center">
            <i :class="`${icon} `"></i>
        </div>
    </div>
</template>

<script setup lang="ts">
    const { icon, title, value, description } = defineProps([
        "icon",
        "title",
        "value",
        "description"
    ]);
</script>
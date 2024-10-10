<template>
    <div>
        <InputGroup>
            <InputGroupAddon :class="icon"></InputGroupAddon>
            <InputText
                :class="`${error && '!border-red-500'}`" 
                :placeholder="placeHolder"
                v-model:model-value="inputValue"
            />
        </InputGroup>
        <p 
            class="text-red-500 mt-2"
            v-if="error"
        >
            {{ message }}
        </p>
    </div>
</template>

<script setup lang="ts">
    const props = defineProps<{
        icon?: string; 
        placeHolder: string;
        message?: string;
        error?: boolean;
        modelValue: string;
    }>();

    const { error, message, modelValue  } = toRefs(props);

    const inputValue = ref(modelValue);
</script>
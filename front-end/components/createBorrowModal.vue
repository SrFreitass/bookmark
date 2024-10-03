<template>
    <Button @click="() => visible = !visible">Realizar emprestimo</Button>
    <Dialog v-model:visible="visible" class="w-1/2 max-w-[35rem]" modal header="Realizar emprestimo">
        <form class="flex flex-col gap-4">
            <InputGroup>
                <InputText placeholder="Nome de usuário"/>
            </InputGroup>
            <InputGroup>
                <InputText type="number" placeholder="ISBN"/>
            </InputGroup>
            <InputGroup>
                <Select :options="['Normal', 'Extendido', 'Atividades']" placeholder="Tipo de emprestimo"/>
            </InputGroup>
            <InputGroup>
                <InputText type="number" placeholder="Quantidade"/>
            </InputGroup>
            <Button>Realizar emprestimo</Button>
        </form>
    </Dialog>
</template>

<script setup lang="ts">
    const visible = ref(false);
</script>       
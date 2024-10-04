<template>
    <Button @click="() => visible = !visible">Realizar emprestimo</Button>
    <Dialog v-model:visible="visible" class="w-1/2 max-w-[50rem]" modal header="Realizar emprestimo">
        <div class="flex gap-4">
            <div>
                <img class="h-full w-80 object-cover rounded-md" src="https://m.media-amazon.com/images/I/71Vkg7GfPFL._AC_UF1000,1000_QL80_.jpg"/>
            </div>
            <form class="flex flex-col gap-4 w-full">
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
                <InputGroup>
                    <DatePicker placeholder="Data de saída"/>
                </InputGroup>
                <Button>Realizar emprestimo</Button>
            </form>
        </div>
    </Dialog>
</template>

<script setup lang="ts">
import DatePicker from 'primevue/datepicker';

    const visible = ref(false);
</script>       
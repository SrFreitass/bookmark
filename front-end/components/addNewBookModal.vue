<template>
    <Button @click="() => visible = !visible" class="mt-4">
        Adicionar livro
    </Button>
    <Dialog v-model:visible="visible" modal header="Adicionar um novo livro">
        <div class="flex gap-4">
            <img class="rounded-md" src="https://m.media-amazon.com/images/I/71Vkg7GfPFL._AC_UF1000,1000_QL80_.jpg" alt="" width="500"/>
            <form class="flex flex-col gap-4 w-[30rem]">
                <InputGroup>
                    <InputText placeholder="ISBN"/>
                </InputGroup>
    
                <InputGroup>
                    <InputText placeholder="Título"/>
                </InputGroup>
    
                <InputGroup>
                    <InputText placeholder="Autores"/>
                </InputGroup>

                <InputGroup>
                    <InputText placeholder="Categoria"/>
                </InputGroup>
    
                <InputGroup>
                    <InputText placeholder="Editora"/>
                </InputGroup>
    
                <InputGroup>
                    <Select placeholder="Linguagem"/>
                </InputGroup>
    
                <InputGroup>
                    <InputText type="number" placeholder="Ano de edição"/>
                </InputGroup>
    
                
                <InputGroup>
                    <InputText type="number" placeholder="Número de páginas"/>
                </InputGroup>
                
                <InputGroup>
                    <InputText type="number" placeholder="Quantidade"/>
                </InputGroup>
                
                <InputGroup>
                    <InputText type="number" placeholder="Prateleira"/>
                </InputGroup>
                
                <FileUpload>
                    <template #empty>
                        <h2>Clique em escolher ou arraste a capa</h2>
                    </template>
                </FileUpload>
    
                <Button>Registrar livro</Button>
            </form>
        </div>
    </Dialog>
</template>

<script setup lang="ts">
import Select from 'primevue/select';

    const visible = ref(false);
</script>
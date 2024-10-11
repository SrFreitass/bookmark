<template>
    <form class="flex flex-col gap-4">
        <div>
            <InputGroup>
                <InputGroupAddon>
                    <i class="pi pi-envelope"</i>
                </InputGroupAddon>
                <InputText placeholder="Seu e-mail"/>
            </InputGroup>
        </div>

        <div>
            <InputGroup>
                <InputGroupAddon>
                    <i class="pi pi-lock"</i>
                </InputGroupAddon>
                <InputText type="password" placeholder="Sua senha"/>
            </InputGroup>
        </div>

        <Button>Entrar</Button>
    </form>
</template>

<script setup lang="ts">

</script>
<template>
    <Header/>
    <main class="p-6">
        <p>Dashboard</p>
        <h1 class="text-2xl">Bom dia, {{ user.name }}!</h1>
        <div class="flex gap-8">
            <Card title="Empréstimos" icon="pi pi-bookmark" value="54" description="Quantidade de emprestimos p/mês"/>
            <Card title="Empréstimos" icon="pi pi-bookmark" value="54" description="Quantidade de emprestimos p/mês"/>
            <Card title="Empréstimos" icon="pi pi-bookmark" value="54" description="Quantidade de emprestimos p/mês"/>
        </div>
    </main>
</template>

<script setup lang="ts">
import Card from '~/components/card.vue';

    const user = {
        name: 'Guilherme Freitas'
    }
</script>
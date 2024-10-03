<template>
    <Header/>
    <main class="p-6">
        <p>Dashboard</p>
        <h1 class="text-2xl">Bom dia, {{ user.name }}!</h1>
        <div class="flex gap-8">
            <Card title="Empréstimos" icon="pi pi-bookmark" value="54" description="Quantidade de emprestimos p/mês"/>
            <Card title="Empréstimos" icon="pi pi-bookmark" value="54" description="Quantidade de emprestimos p/mês"/>
            <Card title="Empréstimos" icon="pi pi-bookmark" value="54" description="Quantidade de emprestimos p/mês"/>
            <Card title="Empréstimos" icon="pi pi-bookmark" value="54" description="Quantidade de emprestimos p/mês"/>
        </div>
        <BorrowTable :borrows="[exampleBorrow]" class="mt-6"/>
        <Chart type="bar" :data="exampleChartData"/>
    </main>
</template>

<script setup lang="ts">
import Card from '~/components/card.vue';
    const exampleBorrow = {
        user: 'Grelo',
        book: 'Entendo Algoritmos',
        category: 'Computação',
        createdAt: new Date().toLocaleDateString('pt-BR'),
        limitDate: new Date().toLocaleDateString('pt-BR')
    }


    const user = {
        name: 'Guilherme Freitas'
    }

    const exampleChartData = {
        labels: ['Contos', 'Romance', 'Literatura negra', 'Educação'],
        datasets: [
            {
                label: 'Empréstimos',
                data: [20, 10, 5, 30]
            }
        ]
    }
</script>
<template>
    <Header/>
    <div class="flex min-h-screen">
        <Sidebar/>
        <main class="p-6">
            <p>Dashboard</p>
            <h1 class="text-2xl">Bom dia, {{ user.name }}!</h1>
            <div class="flex gap-8">
                <Card title="Empréstimos" icon="pi pi-bookmark" value="54" description="Quantidade de emprestimos p/mês"/>
                <Card title="Empréstimos" icon="pi pi-bookmark" value="54" description="Quantidade de emprestimos p/mês"/>
                <Card title="Empréstimos" icon="pi pi-bookmark" value="54" description="Quantidade de emprestimos p/mês"/>
                <Card title="Empréstimos" icon="pi pi-bookmark" value="54" description="Quantidade de emprestimos p/mês"/>
            </div>
            <div class="flex gap-8 mt-6">
                <BorrowTable :borrows="[exampleBorrow, exampleBorrow, exampleBorrow, exampleBorrow, exampleBorrow, exampleBorrow, exampleBorrow]" class="w-1/2"/>
                <Chart type="bar" :data="exampleChartData" class="w-1/2"/>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import Card from '~/components/card.vue';
import Sidebar from '~/components/sidebar.vue';
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
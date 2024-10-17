<template>
    <div>
        <h1 class="text-2xl font-semibold">Bom dia, {{ user?.name }}!</h1>
        <p>Dashboard</p>
        <div class="grid grid-cols-dashboard gap-8">
            <Card title="Empréstimos ativos" icon="pi pi-bookmark" value="54" description="Emprestimos pendentes p/mês"/>
            <Card title="Empréstimos" icon="pi pi-bookmark" value="54" description="Emprestimos totais p/mês"/>
            <Card title="Caloteiros" icon="pi pi-bookmark" value="54" description="Caloteiros do mês"/>
            <Card title="Usuários" icon="pi pi-bookmark" value="54" description="Usuários na plataforma"/>
            <BorrowTable :borrows="[exampleBorrow, exampleBorrow, exampleBorrow, exampleBorrow, exampleBorrow, exampleBorrow, exampleBorrow]" class="col-span-3"/>
            <Chart class="bg-card-bg border border-border rounded-md p-4" type="pie" :data="exampleChartData" :options="exampleChartOptions"/>
        </div>
        <UsersPendencyTable class="mt-6"/>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'admin'
});

import Card from '~/components/card.vue';
import Sidebar from '~/components/adminSidebar.vue';
    const exampleBorrow = {
        user: 'Grelo',
        book: 'Entendo Algoritmos',
        quantity: 1,
        category: 'Computação',
        createdAt: new Date().toLocaleDateString('pt-BR'),
        limitDate: new Date().toLocaleDateString('pt-BR')
    }


    const { value: { user } } = useGlobalState();

    const exampleChartData = {
        labels: ['Romance', 'Contos', 'Ficção', 'Outros'],
        datasets: [
            {
                data: [540, 325, 702],
                backgroundColor: ['#00dc82', '#009658', '#067549'],
            }
        ]
    }
    
    const exampleChartOptions = {
       /* indexAxis: 'x',
        aspectRatio: 1.35,
        barPercentage: 0.4, */
        borderColor: '#5454547',
        borderWidth: 1.5,
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                }
            }
        },
        scales: {
    
        }
    }
</script>
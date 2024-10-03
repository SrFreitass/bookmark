<template>
    <Header/>
    <div class="flex min-h-screen">
        <Sidebar/>
        <main class="p-6">
            <p>Dashboard</p>
            <h1 class="text-2xl font-semibold">Bom dia, {{ user.name }}!</h1>
            <div class="flex gap-8">
                <Card title="Empréstimos" icon="pi pi-bookmark" value="54" description="Emprestimos p/mês"/>
                <Card title="Categoria" icon="pi pi-bookmark" value="Romance" description="Categoria mais popular"/>
                <Card title="Pendências" icon="pi pi-bookmark" value="5" description="Usuários caloteiros"/>
                <Card title="C. Literatura" icon="pi pi-bookmark" value="10" description="Membros"/>
            </div>
            <div class="flex gap-8 mt-6">
                <MinBorrowTable :borrows="[exampleBorrow, exampleBorrow, exampleBorrow, exampleBorrow, exampleBorrow, exampleBorrow, exampleBorrow]" class="w-2/3"/>
                <Chart type="bar" :data="exampleChartData" class="w-1/2" :options="exampleChartOptions"/>
            </div>
            <UsersPendencyTable class="mt-6" :users="[exampleUserPendency, exampleUserPendency, exampleUserPendency, exampleUserPendency        ]" />
        </main>
    </div>
</template>

<script setup lang="ts">        
import Card from '~/components/card.vue';
import Sidebar from '~/components/sidebar.vue';
    const exampleBorrow = {
        user: 'Grelo',
        book: 'Entendo Algoritmos',
        quantity: 1,
        category: 'Computação',
        createdAt: new Date().toLocaleDateString('pt-BR'),
        limitDate: new Date().toLocaleDateString('pt-BR')
    }

    const exampleUserPendency = {
        user: 'Joh Doe',
        book: 'Design Patterns',
        createdAt: new Date().toLocaleDateString('pt-BR'),
        limitDate: new Date().toLocaleDateString('pt-BR'),
        days: 2,
    }


    const user = {
        name: 'Guilherme Freitas'
    }

    const exampleChartData = {
        labels: ['Contos', 'Romance', 'Literatura negra', 'Educação'],
        datasets: [
            {
                label: 'Empréstimos',
                data: [20, 10, 5, 30],
                backgroundColor: '#00dc82',
                borderWidth: '1px'
            }
        ]
    }
    
    const exampleChartOptions = {
        indexAxis: 'x',
        aspectRatio: 1.35,
        barPercentage: 0.4,
        scales: {
            x: {
                grid: {
                    color: 'rgba(84, 84, 84, 0.48)'
                }
            },
            y: {
                grid: {
                    color: 'rgba(84, 84, 84, 0.48)'
                }
            }
        }
    }
</script>
<template>
  <div>
    <h1 class="text-2xl font-semibold">Bom dia, {{ user?.name }}!</h1>
    <p>Dashboard</p>
    <div class="grid grid-cols-dashboard gap-8 max-2xl:grid-cols-dashboard-2 max-2xl:gap-4">
      <AdminBooksCard
        title="Empréstimos ativos"
        icon="pi pi-bookmark"
        value="25"
        description="E. pendentes/mês"
        class="max-2xl:w-[19rem]"
      />
      <AdminBooksCard
        title="Empréstimos"
        icon="pi pi-bookmark"
        value="60"
        description="E. totais/mês"
        class="max-2xl:w-[19rem]"
      />
      <AdminBooksCard
        title="Devedores"
        icon="pi pi-bookmark"
        value="10"
        description="Devedores na plataforma"
        class="max-2xl:w-[19rem]"

      />
      <AdminBooksCard
        title="Usuários"
        icon="pi pi-bookmark"
        value="40"
        description="Usuários na plataforma"
        class="max-2xl:hidden"
      />
      <BorrowTable
        :borrows="borrow"
        class="col-span-3"
      />
      <Chart
        class="bg-card-bg border border-border rounded-md p-4 max-2xl:hidden"
        type="pie"
        :data="exampleChartData"
        :options="exampleChartOptions"
      />
    </div>
    <AdminBooksPendencyTable class="mt-6" />
  </div>
</template>

<script setup lang="ts">
import type { IBorrow } from '~/models/IBorrow';

definePageMeta({
  layout: "admin",
});

// id: string,
//     bookId: string,
//     userId: string,
//     borrow: boolean | string,
//     createdAt: string,
//     statusUpdateAt: string,
//     limitDate: string


const exampleBorrow = {
  id: "1",
  userName: "Gabriel",
  bookTitle: "Harry Potter",
  quantity: 1,
  category: "Computação",
  createdAt: new Date().toLocaleDateString("pt-BR"),
  limitDate: new Date().toLocaleDateString("pt-BR"),
  borrow: "Emprestado",
  statusUpdateAt: new Date().toLocaleDateString("pt-BR"),
};

const borrow = reactive<{ list: IBorrow[] }>({
  // @ts-ignore FIXME: fix this! URGENCY!
  list: [exampleBorrow, exampleBorrow, exampleBorrow, exampleBorrow, exampleBorrow],
});

const {
  value: { user },
} = useGlobalState();

const exampleChartData = {
  labels: ["Romance", "Contos", "Ficção", "Outros"],
  datasets: [
    {
      data: [10, 19, 30, 1],
      backgroundColor: ["#00dc82", "#009658", "#067549"],
    },
  ],
};

const exampleChartOptions = {
  /* indexAxis: 'x',
        aspectRatio: 1.35,
        barPercentage: 0.4, */
  borderColor: "#5454547",
  borderWidth: 1.5,
  plugins: {
    legend: {
      labels: {
        usePointStyle: true,
      },
    },
  },
  scales: {},
};
</script>

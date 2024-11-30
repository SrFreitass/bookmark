<template>
  <div class="max-w-[1600px]">
    <h1 class="text-2xl font-semibold">Bom dia, {{ user?.name }}!</h1>
    <p>Dashboard</p>
    <div class="flex gap-4 mb-4">
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
    </div>
    <div class="grid grid-cols-dashboard gap-8 max-2xl:gap-4">
      <BorrowTable
        :borrows="borrow"
        class="col-span-3"
      />
    </div>
    <AdminBooksPendencyTable class="mt-6" />
    <div class="flex gap-4 mt-4">
      <Chart
        class="bg-card-bg border border-border rounded-md p-4 grow"
        type="line"
        :data="exampleChartData"
        :options="exampleChartOptions"
      />
      <Chart
        class="bg-card-bg border border-border rounded-md p-4 grow"
        type="pie"
        :data="exampleChartData"
        :options="exampleChartOptions"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { getBorrows } from '~/http/borrow/getBorrows';
import type { IBorrow } from '~/models/IBorrow';


definePageMeta({
  layout: "admin",
  middleware: 'admin'
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

const borrows = ref<IBorrow[]>([]);

const fetchBorrows = async () => {
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();

  const res = await getBorrows(`${month}-01-${year}`, `${month}-30-${year}`)

  if(!res?.success) return;
  
  borrow.list = res.data;
}

fetchBorrows();

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


<template>
    <div>
        <p>Gerencie todos os usuários da biblioteca</p>
        <h1 class="text-2xl font-semibold">Gerenciar usuários</h1>
        <FilterUsers @filter="filter" @change="filterInput" />
        <UsersTable 
            :users="users"
            @changePage="onChangePage"
        />
    </div>
</template>

<script setup lang="ts">
import type { Reactive } from 'vue';
import { getUserByName } from '~/http/user/getUserByName';
import { getUsers } from '~/http/user/getUsers';
import type { User } from '~/models/IUser';

definePageMeta({
    layout: 'admin'
})


const users = reactive<{
    filterActive: null | string;
    list: User[];
    total: number;
}>({
    filterActive: null,
    list: [],
    total: 0
}); 
const fetchUsers = async (page: number = 1, filter?: { borrow?: boolean, pendency?: boolean }) => {
    const res = await getUsers(page, filter);

    console.log(res);

    if(!res?.success) return;
    
    const lastIndex = res.data.length-1

    if(res.data[lastIndex]?.total || res.data[lastIndex]?.total === 0) {
        users.total = res.data[lastIndex].total as number;
        users.list = res.data as User[];
        users.list.pop();
    };
}

const searchUser = async (name: string) => {
    if(!name) {
        await fetchUsers();
        return;
    }
    console.log(name, 'name')
    const res = await getUserByName(name);

    console.log(res, 'res');
    if(!res?.success) return;

    users.list = res.data;
}


const onChangePage = async (e: { page: number }) => {
    if(users.filterActive === 'BORROW') {
        await fetchUsers(e.page+1, { borrow: true });
        return;
    }

    if(users.filterActive === 'PENDENCY') {
        await fetchUsers(e.page+1, { pendency: true });
        return;
    }

    await fetchUsers(e.page+1);
}

const filterInput = async (e: Event) => {
    const target = e.target as HTMLInputElement;
    await searchUser(target.value);
}

const filter = async (type: string) => {
    if(type === 'Devedores') {
        users.filterActive = 'BORROW'
        await fetchUsers(1, { borrow: true });
    }

    if(type === 'Pendentes') {
        users.filterActive = 'PENDENCY'
        await fetchUsers(1, { pendency: true });
    }

    if(type === 'Resetar filtro') {
        users.filterActive = null
        await fetchUsers(1);
    }
}

fetchUsers();
</script>
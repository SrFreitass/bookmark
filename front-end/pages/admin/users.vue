
<template>
    <div>
        <p>Gerencie todos os usuários da biblioteca</p>
        <h1 class="text-2xl font-semibold">Gerenciar usuários</h1>
        <FilterUsers />
        <UsersTable :users="users"/> 
    </div>
</template>

<script setup lang="ts">
import type { Reactive } from 'vue';
import { getUsers } from '~/http/user/getUsers';
import type { User } from '~/models/IUser';

definePageMeta({
    layout: 'admin'
})

const users = reactive<User[]>([]); 

const fetchUsers = async () => {
    const res = await getUsers(1);

    if(!res?.success) return;

    users.push(...res.data);
}

fetchUsers();
</script>
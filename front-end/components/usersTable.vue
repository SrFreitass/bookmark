<template>
    <DataTable show-gridlines class="mt-4" :value="users">
        <Column key="username" header="Usuário">
            <template #body="user">
                <div class="flex items-center gap-2">
                    <img :src="user.data.avatarURL" width="42px" height="42px" class="rounded-md"/>
                    <p>{{ user.data.username }}</p>
                </div>
            </template>
        </Column>
        <Column key="name" header="Nome" field="name"></Column>
        <Column key="role" header="Cargo" field="role"></Column>
        <Column key="email" header="E-mail" field="email"></Column>
        <Column key="createdAt" header="Criada" field="createdAt"></Column>
    </DataTable>
</template>

<script setup lang="ts">
import type { User } from '~/models/IUser';

    const { users } = defineProps<{
        users: User[]
    }>()
</script>
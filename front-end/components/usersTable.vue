<template>
    <DataTable show-gridlines class="mt-4":value="[{ username: 'Freitasdev', name: 'Guilherme F.', role: 'Desenvolvedor', email: 'freitas@google.com', createdAt: '01/01/2025' }]">
        <Column key="username" header="Usuário">
            <template #body="user">
                <div class="flex items-center gap-2">
                    <img src="https://github.com/srfreitass.png" width="42px" height="42px" class="rounded-md"/>
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
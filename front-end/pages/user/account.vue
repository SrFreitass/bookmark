<template>
    <UserAccount
        :username="user?.username || '' "
        :name="user?.name || '' "
        :avatar-url="user?.avatarURL || '' "
        :birthday="user?.birthday || '' "
        :email="user?.email || '' "
        :role="user?.role || '' "
    />
</template>

<script setup lang="ts">
import { getUserById } from '~/http/user/getUserById';
import type { User } from '~/models/IUser';

definePageMeta({
    layout: 'user'
})

const user = ref<User>();


const fetchUser = async () => {
  const globalState = useGlobalState();
  const res = await getUserById(globalState.value.user?.id as string);

  if (!res?.success) return;

  user.value = res.data as User;
}

fetchUser();
</script>

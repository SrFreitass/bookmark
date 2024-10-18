<template>
    <Button @click="() => visible = !visible">Realizar emprestimo</Button>
    <Dialog v-model:visible="visible" class="w-1/2 min-w-[50rem]" modal header="Realizar emprestimo">
        <div class="flex gap-4">
            <div>
                <img class="h-full min-w-64 max-w-64 object-cover rounded-md" :src="coverURL || 'https://placehold.co/250x400'"/>
            </div>
            <form class="flex flex-col gap-4 w-full">
                <div>
                    <InputGroup>
                        <InputText placeholder="Nome de usuário"
                        v-model:model-value="form.username"
                        :class="`${formErrors?.username.error ? '!border-red-500' : ''}`"
                        />
                    </InputGroup>
                    <p class="text-red-500 mt-2">{{ formErrors?.username.message }}</p>
                </div>
                <div>
                    <InputGroup>
                        <InputText type="number" placeholder="ISBN"
                        v-model:model-value="form.isbn"
                        :class="`${formErrors?.isbn.error ? '!border-red-500' : ''}`"
                        />
                    </InputGroup>
                    <p class="text-red-500 mt-2">{{ formErrors?.isbn.message }}</p>
                </div>
                <div>
                    <InputGroup>
                        <Select 
                        :options="['Normal', 'Extendido', 'Atividades']" 
                        placeholder="Tipo de emprestimo"
                        v-model:model-value="form.type"
                        :class="`${formErrors?.type.error ? '!border-red-500' : ''}`"
                        />
                    </InputGroup>
                    <p class="text-red-500 mt-2">{{ formErrors?.type.message }}</p>
                </div>
                <div>
                    <InputGroup>
                        <InputNumber :use-grouping="false" placeholder="Quantidade"
                        v-model:model-value="form.quantity"
                        :class="`${formErrors?.quantity.error ? '!border-red-500' : ''}`"
                        />
                    </InputGroup>
                    <p class="text-red-500 mt-2">{{ formErrors?.quantity.message }}</p>
                </div>
                <div>
                    <InputGroup>
                        <DatePicker placeholder="Data de saída"
                        v-model:model-value="form.date"
                        :class="`${formErrors?.statusUpdateAt.error ? '!border-red-500' : ''}`"
                        />
                    </InputGroup>
                    <p class="text-red-500 mt-2">{{ formErrors?.statusUpdateAt.message }}</p>
                </div>
                <Button @click="onSubmit">Realizar emprestimo</Button>
            </form>
        </div>
    </Dialog>
</template>

<script setup lang="ts">
import DatePicker from 'primevue/datepicker';
import { getBookByISBN } from '~/http/book/getBookByISBN';
import { createBorrows } from '~/http/borrow/createBorrow';
import { getUserByName } from '~/http/user/getUserByName';

    const visible = ref(false);
    const timeoudId = ref();
    const toast = useToast();
    const coverURL = ref('');

    const form = reactive({
        username: '',
        isbn: '',
        type: '',
        quantity: 1,
        date: ''
    })
    
    const formErrors = ref<Record<string, { error: boolean; message: string }>>()

    const fetchCover = async () => {
        const book = await getBookByISBN(form.isbn);

        if(!book?.success) return;

        coverURL.value = book.data.coverURL;
    }

    const onSubmit = async () => {
        console.log('submit');
        const { containsErrors, formErrors: errors } = useBorrowValidation({
            bookId: form.isbn,
            userId: form.username,
        });

        if (containsErrors) {
            toast.add({
                severity: 'error',
                summary: 'Erro',
                detail: 'Preencha os campos corretamente',
                life: 3000
            });
            
            formErrors.value = errors;
            return;
        }

        const user = await getUserByName(form.username);

        if(!user?.success || user.data.length > 1) {
            toast.add({
                severity: 'error',
                summary: 'Erro',
                detail: 'Usuário não encontrado',
                life: 3000
            });
            return;
        };

        const res = await createBorrows({
            bookId: form.isbn,
            userId: user.data[0].id,
            type: form.type === 'Normal' ? 'LONG' : 'SHORT',
            quantity: form.quantity,
            // date: form.date
        });

        if(res?.message === 'User already have a book borrowed') {
            toast.add({
                severity: 'error',
                summary: 'Erro',
                detail: 'Usuário já possui um livro emprestado',
                life: 3000
            });
            return;
        }

        if(!res?.success) {
            toast.add({
                severity: 'error',
                summary: 'Erro',
                detail: 'Erro ao realizar emprestimo',
                life: 3000
            });
            return;
        };


        toast.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Emprestimo realizado com sucesso',
            life: 3000
        });

        visible.value = false;
    }

    watch(form, async (newValue) => {
        clearInterval(timeoudId.value);
        await new Promise((resolve) => {
            timeoudId.value = setTimeout(() => {
                fetchCover();
                return resolve('');
            }, 500)
        });

    }, { deep: true })
</script>       
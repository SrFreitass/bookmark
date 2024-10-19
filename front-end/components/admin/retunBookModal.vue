<template>
    <Button @click="() => visible = !visible" class="w-50">Devolver livro</Button>
    <Dialog v-model:visible="visible" class="w-1/2 min-w-[50rem]" modal header="Devolver livro">
        <div class="flex gap-4">
            <div>
                <img class="h-full min-w-64 max-w-64 object-cover rounded-md" :src="coverURL || 'https://placehold.co/250x400'"/>
            </div>
            <form class="w-full flex flex-col gap-4">
                <div>
                    <InputText placeholder="ISBN" :class="`w-full ${formErrors.isbn.error ? '!border-red-500' : ''}`" v-model:model-value="form.isbn"/>
                    <p class="text-red-500 mt-2">{{ formErrors.isbn.message }}</p>
                </div>

                <div>
                    <InputText placeholder="Usuário" :class="`w-full ${formErrors.user.error ? '!border-red-500' : ''}`" v-model:model-value="form.user"/>
                    <p class="text-red-500 mt-2">{{ formErrors.user.message }}</p>
                </div>

                
                <div>
                    <DatePicker placeholder="Data de devolução" :class="`w-full ${formErrors.returnDate.error ? '!border-red-500' : ''}`" v-model:model-value="form.returnDate" />
                    <p class="text-red-500 mt-2">{{ formErrors.returnDate.message }}</p>
                </div>

                <Button type="button" label="Confirmar devolução" @click="onReturn"/>
            </form>
        </div>
    </Dialog>
</template>

<script setup lang="ts">
import { getBookByISBN } from '~/http/book/getBookByISBN';
import { returnBook } from '~/http/borrow/returnBook';
import { getUserByName } from '~/http/user/getUserByName';

    const toast = useToast();

    const visible = ref(false);
    const form = reactive({
        userId: '',
        isbn: '',
        user: '',
        quantity: 0,
        returnDate: new Date(),
    });

    const formErrors = reactive({
        isbn: {
            error: false,
            message: '',
        },
        user: {
            error: false,
            message: '',
        },
        quantity: {
            error: false,
            message: '',
        },
        returnDate: {
            error: false,
            message: '',
        },
    })
    
    const coverURL = ref('');

    watch(form, () => {
        if(form.isbn.length == 13 || form.isbn.length == 10 || coverURL.value) {
            fetchCover();
        }
        formErrors.isbn.error = false;
        formErrors.isbn.message = '';
    })

    const fetchCover = async () => {
       const res = await getBookByISBN(form.isbn);
       if(res?.data) {
           coverURL.value = res.data.coverURL;
       }
    };

    const onReturn = async () => {
        let containsErrors = false;

        if(form.isbn.length == 13 || form.isbn.length == 10) {
            const res = await getBookByISBN(form.isbn);
            if(!res?.success || !res.data) {
                formErrors.isbn.error = true;
                formErrors.isbn.message = 'ISBN inválido';
                containsErrors = true;
            } else {
                formErrors.isbn.error = false;
                formErrors.isbn.message = '';
            }
        } else {
            formErrors.isbn.error = true;
            formErrors.isbn.message = 'ISBN inválido';
            containsErrors = true;
        }

        if(form.user) {
            const res = await getUserByName(form.user);

            if(!res?.success || res.data.length == 0) {
                formErrors.user.error = true;
                formErrors.user.message = 'Usuário não encontrado';
                containsErrors = true;
            }

            if(res) {
                form.userId = res.data[0].id;
            }

            formErrors.user.error = false;
            formErrors.user.message = '';
        } else {
            formErrors.user.error = true;
            formErrors.user.message = 'Usuário é obrigatório';
            containsErrors = true;
        }

        if(new Date() < form.returnDate) {
            formErrors.returnDate.error = true;
            formErrors.returnDate.message = 'Data de devolução deve ser maior que hoje';
            containsErrors = true;
        } else {
            formErrors.returnDate.error = false;
            formErrors.returnDate.message = '';
        }

        if(containsErrors) {
            return;
        }

        const res = await returnBook(form.isbn, form.userId);

        if (!res?.success) {
            toast.add({
                severity: 'error',
                summary: 'Erro',
                detail: 'Erro ao devolver livro',
            })
            return;
        };
    };  
</script>
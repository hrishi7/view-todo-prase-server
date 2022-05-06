<template>
    <q-form ref="signUpForm" class="q-pa-md q-gutter-md" @submit="signUp">

        <v-input v-model="_user.firstName" class="col-12" :rules="[required]" lazy-rules="ondemand" color="primary"
            label="First Name" />
        <v-input v-model="_user.lastName" class="col-12" :rules="[required]" lazy-rules="ondemand" color="primary"
            label="Last Name" />
        <v-input v-model="_user.username" class="col-12" :rules="[required]" lazy-rules="ondemand" color="primary"
            label="Username" />

        <v-input v-model="_user.email" class="col-12" type="email" :rules="[required, isEmail]" lazy-rules="ondemand"
            color="primary" label="Email" />

        <v-input v-model="_user.password" class="col-12" :type="isPasswordVisible ? 'text' : 'password'"
            :rules="[required]" lazy-rules="ondemand" color="primary" label="Password">

            <template #append>
                <q-icon :name="isPasswordVisible ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                    @click="isPasswordVisible = !isPasswordVisible" />
            </template>
        </v-input>
        <div class="row justify-between items-center q-pt-md">
            <div class="col row items-center">
                <span>already have an account?</span>
                <q-btn to="/login" color="primary" class="text-subtitle1" label="Login" flat no-caps :ripple="false" />
            </div>
            <q-btn color="primary" label="Sign up" type="submit" :loading="loading" />
        </div>
    </q-form>
</template>
<script setup lang="ts">
import { QForm, useQuasar, QIcon } from 'quasar';
import { ref } from 'vue';
import VInput from 'src/components/custom/VInput.vue';
import { isEmail, required } from 'src/utils/validation-rules';
import { useUserStore } from 'src/stores/user'
import { useRouter } from 'vue-router';
import { Except } from 'type-fest';

export type AddUserAttributes = Except<UserAttributes, 'id' | 'createdAt' | 'updatedAt' | 'sessionToken'>
interface Props {
    user?: {
        firstName: AddUserAttributes['firstName'];
        lastName: AddUserAttributes['lastName'];
        username: AddUserAttributes['username'];
        email: AddUserAttributes['email'];
        password: AddUserAttributes['password'];
    }
}

const props = withDefaults(defineProps<Props>(), {
    user: () => ({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: ''
    })
});

const _user = ref<AddUserAttributes>(props.user)

const userStore = useUserStore();
const router = useRouter();
const $q = useQuasar();
const signUpForm = ref<InstanceType<typeof QForm>>();
const isPasswordVisible = ref(false);
const loading = ref(false);

async function signUp() {
    const isValid = await signUpForm.value?.validate();
    if (!isValid) return;

    loading.value = true;
    try {
        await userStore.signup(_user.value);
        router.replace('/tasks')
    } catch (error: any) {
        $q.notify({
            message: error.message,
            type: 'negative',
            position: 'bottom',
            icon: 'error'
        });
    } finally {
        loading.value = false;
    }
}
</script>

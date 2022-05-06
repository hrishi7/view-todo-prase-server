<template>
    <q-form ref="loginForm" class="q-pa-md q-gutter-md" @submit="signIn">
        <v-input v-model="email" class="col-12" type="email" :rules="[required, isEmail]" lazy-rules="ondemand"
            color="primary" label="Email">
        </v-input>
        <v-input v-model="password" class="col-12" :type="isPasswordVisible ? 'text' : 'password'" :rules="[required]"
            lazy-rules="ondemand" color="primary" label="Password">
            <template #append>
                <q-icon :name="isPasswordVisible ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                    @click="isPasswordVisible = !isPasswordVisible" />
            </template>
        </v-input>
        <div class="row justify-between items-center q-pt-md">
            <div class="col row items-center">
                <span>Don't have an account?</span>
                <q-btn to="/sign-up" color="primary" class="text-subtitle1" label="Sign Up" flat no-caps
                    :ripple="false" />
            </div>
            <q-btn color="primary" label="Sign in" type="submit" :loading="loading" />
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

const userStore = useUserStore();
const router = useRouter();
const $q = useQuasar();
const loginForm = ref<InstanceType<typeof QForm>>();
const email = ref('');
const password = ref('');
const isPasswordVisible = ref(false);
const loading = ref(false);

async function signIn() {
    const isValid = await loginForm.value?.validate();
    if (!isValid) return;

    loading.value = true;
    try {
        const formattedEmail = email.value.toLowerCase();
        await userStore.login({ email: formattedEmail, password: password.value });
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

<script setup lang="ts">
import { reactive, ref } from '@vue/reactivity';
import { logIn, signUp } from 'src/services/auth';

import { useRouter } from 'vue-router';

import { required, short, isEmail } from 'src/utils/auth';
import { showNotify } from 'src/utils/common';
import { useQuasar } from 'quasar';

type FormView = 'SIGNIN' | 'SIGNUP';
type PasswordViewType = 'text' | 'password';

const credientials = reactive({
  email: '',
  name: '',
  username: '',
  password: '',
});
const q = useQuasar();
const rePassword = ref('');
const submitting = ref(false);
const formView = ref<FormView>('SIGNUP');
const passwordFieldView = ref<PasswordViewType>('password');

const rePasswordFieldView = ref<PasswordViewType>('password');

const router = useRouter();

function changeView() {
  if (formView.value == 'SIGNUP') formView.value = 'SIGNIN';
  else formView.value = 'SIGNUP';
}
function changePasswordView() {
  if (passwordFieldView.value == 'text') passwordFieldView.value = 'password';
  else passwordFieldView.value = 'text';
}
function reChangePasswordView() {
  if (rePasswordFieldView.value == 'text')
    rePasswordFieldView.value = 'password';
  else rePasswordFieldView.value = 'text';
}

function diffPassword(val: string) {
  return (val && val === credientials.password) || 'Password mismatched!';
}

async function onSubmit() {
  submitting.value = true;
  const { email, name, username, password } = credientials;
  if (formView.value == 'SIGNUP') {
    ////call signup action
    let signUpCreds = {
      email,
      username,
      name,
      password,
    };
    let response = await signUp(signUpCreds);
    submitting.value = false;
    if (response.success) {
      showNotify(q, response.message, 'positive', 'success');
      router.push('/all');
    } else {
      showNotify(q, response.message, 'negative', 'error');
    }
  } else {
    //call login action

    let loginCreds = {
      username,
      password,
    };
    let response = await logIn(loginCreds);
    submitting.value = false;

    if (response.success) {
      showNotify(q, response.message, 'positive', 'success');
      router.push('/all');
    } else {
      showNotify(q, response.message, 'negative', 'error');
    }
  }
}
</script>

<template>
  <q-layout view="lHh Lpr fff">
    <q-page
      class="row justify-center items-center"
      style="background: linear-gradient(#8274c5, #5a4a9f)"
    >
      <div class="column q-pa-lg">
        <div class="row">
          <q-card square class="shadow-24" style="width: 400px; height: 600px">
            <q-card-section class="bg-deep-purple-7">
              <h4 class="text-h5 text-white q-my-md">{{ title }}</h4>
            </q-card-section>
            <q-card-section>
              <q-fab
                color="primary"
                @click="changeView"
                icon="add"
                class="absolute"
                style="top: 0; right: 12px; transform: translateY(-50%)"
              >
                <!-- <q-tooltip> {{ formView }} </q-tooltip> -->
              </q-fab>
              <q-form @submit.prevent.stop="onSubmit" class="q-px-sm q-pt-xl">
                <q-input
                  ref="email"
                  square
                  clearable
                  v-if="formView == 'SIGNUP'"
                  v-model="credientials.email"
                  type="email"
                  lazy-rules
                  :rules="[required, isEmail]"
                  label="Email"
                >
                  <template v-slot:prepend>
                    <q-icon name="email" />
                  </template>
                </q-input>
                <q-input
                  ref="name"
                  v-if="formView == 'SIGNUP'"
                  square
                  clearable
                  v-model="credientials.name"
                  type="text"
                  label="Full Name"
                >
                  <template v-slot:prepend>
                    <q-icon name="person" />
                  </template>
                </q-input>
                <q-input
                  ref="username"
                  square
                  clearable
                  v-model="credientials.username"
                  lazy-rules
                  :rules="[required, short]"
                  type="username"
                  label="Username"
                >
                  <template v-slot:prepend>
                    <q-icon name="person" />
                  </template>
                </q-input>
                <q-input
                  ref="password"
                  square
                  clearable
                  v-model="credientials.password"
                  :type="passwordFieldView"
                  lazy-rules
                  :rules="[required, short]"
                  label="Password"
                >
                  <template v-slot:prepend>
                    <q-icon name="lock" />
                  </template>
                  <template v-slot:append>
                    <q-icon
                      :name="visibilityIcon"
                      @click="changePasswordView"
                      class="cursor-pointer"
                    />
                  </template>
                </q-input>
                <q-input
                  ref="password2"
                  v-if="formView == 'SIGNUP'"
                  square
                  clearable
                  v-model="rePassword"
                  :type="rePasswordFieldView"
                  lazy-rules
                  :rules="[required, short, diffPassword]"
                  label="Re Enter Password"
                >
                  <template v-slot:prepend>
                    <q-icon name="lock" />
                  </template>
                  <template v-slot:append>
                    <q-icon
                      :name="visibilityIcon"
                      @click="reChangePasswordView"
                      class="cursor-pointer"
                    />
                  </template>
                </q-input>
                <q-btn
                  unelevated
                  size="lg"
                  color="secondary"
                  type="submit"
                  class="full-width text-white"
                  :label="formView"
                  :loading="submitting"
                />
              </q-form>
            </q-card-section>

            <q-card-section class="text-center q-pa-sm">
              <p
                class="text-grey-6 cursor-pointer"
                v-if="formView == 'SIGNIN'"
                @click="changeView"
              >
                Create Account?
              </p>
              <p class="text-grey-6 cursor-pointer" v-else @click="changeView">
                Already have account ! Login
              </p>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </q-page>
  </q-layout>
</template>

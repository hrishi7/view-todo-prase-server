<script setup lang="ts">
import { reactive, ref } from '@vue/reactivity';

type FormView = 'SIGNIN' | 'SIGNUP';
type PasswordViewType = 'text' | 'password';

const credientials = reactive({
  email: '',
  username: '',
  password: '',
  rePassword: '',
});
const formView = ref<FormView>('SIGNUP');
const passwordFieldView = ref<PasswordViewType>('password');
const rePasswordFieldView = ref<PasswordViewType>('password');

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

function required(val: string) {
  return (val && val.length > 0) || 'Filed is required';
}
function diffPassword(val: string) {
  return (val && val === credientials.password) || 'Password mismatched!';
}
function short(val: string) {
  return (
    (val && val.length > 3) || 'Password must be more than 3 charecter atleast'
  );
}
function isEmail(val: string) {
  const emailPattern =
    /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
  return emailPattern.test(val) || 'Invalid Email ! please enter correct email';
}

function onSubmit() {
  if (formView.value == 'SIGNUP') {
    ////call signup action
  } else {
    //call login action
  }
}

function getBtnIcon() {
  return formView.value == 'SIGNUP' ? 'close' : 'add';
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
          <q-card square class="shadow-24" style="width: 400px; height: 540px">
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
              <q-form class="q-px-sm q-pt-xl">
                <q-input
                  ref="email"
                  square
                  clearable
                  v-model="credientials.email"
                  type="email"
                  lazy-rules
                  :rules="[this.required, this.isEmail, this.short]"
                  label="Email"
                >
                  <template v-slot:prepend>
                    <q-icon name="email" />
                  </template>
                </q-input>
                <q-input
                  ref="username"
                  v-if="formView == 'SIGNUP'"
                  square
                  clearable
                  v-model="credientials.username"
                  lazy-rules
                  :rules="[this.required, this.short]"
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
                  :rules="[this.required, this.short]"
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
                  ref="repassword"
                  v-if="formView == 'SIGNUP'"
                  square
                  clearable
                  v-model="credientials.repassword"
                  :type="rePasswordFieldView"
                  lazy-rules
                  :rules="[this.required, this.short, this.diffPassword]"
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
              </q-form>
            </q-card-section>

            <q-card-actions class="q-px-lg">
              <q-btn
                unelevated
                size="lg"
                color="secondary"
                @click="submit"
                class="full-width text-white"
                :label="formView"
              />
            </q-card-actions>
            <q-card-section
              v-if="!formView == 'SIGNUP'"
              class="text-center q-pa-sm"
            >
              <p class="text-grey-6">Create Account?</p>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </q-page>
  </q-layout>
</template>

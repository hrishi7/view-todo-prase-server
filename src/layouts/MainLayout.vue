<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title to=""> Todo App </q-toolbar-title>
        <q-space />
        <q-btn to="/" flat round dense icon="home" />
        <q-btn
          v-if="!isAuthrorized"
          to="/authentication"
          flat
          round
          dense
          icon="group_add"
        />
        <q-btn
          v-if="isAuthrorized"
          @click="handleLogout"
          flat
          round
          dense
          icon="logout"
        />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { onMounted, onUpdated, ref } from '@vue/runtime-core';
import { isLoggedIn, logOut } from 'src/services/auth';
import { useRouter } from 'vue-router';
const isAuthrorized = ref(false);
const router = useRouter();
onMounted(() => {
  isAuthrorized.value = isLoggedIn();
});

onUpdated(() => {
  isAuthrorized.value = isLoggedIn();
});

function handleLogout() {
  logOut();
  router.push('/authentication');
}
</script>

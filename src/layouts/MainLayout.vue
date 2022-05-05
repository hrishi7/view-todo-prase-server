<template>
  <q-layout view="lHh LpR lFr">
    <q-header class="bg-white text-grey-9 shadow-2">
      <q-toolbar>

        <q-toolbar-title>
          {{ $route.meta.displayName }}
        </q-toolbar-title>
        <q-btn label="Help" color="bg-white" flat no-caps stretch icon="help_outline" />
        <q-btn-dropdown no-caps flat stretch class="text-subtitle1">
          <template #label>
            <q-avatar class="q-mr-sm" color="primary" text-color="white">
              {{ getInitials(userStore.user?.get('name') ?? 'TodoApp') }}
            </q-avatar>
            Hello {{ userStore.user?.get('firstName') }}
          </template>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>


    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getInitials } from 'src/utils';
import { useUserStore } from 'src/stores/user';

const userStore = useUserStore();
</script>
<style lang="scss">
.plan-card {
  height: 84px;
  border-radius: 6px 6px 0 0;
  background-color: #1f3847;
}
</style>



<!-- <template>
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
</script> -->

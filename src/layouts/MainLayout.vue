<template>
  <q-layout view="lHh LpR lFr">
    <q-header class="bg-white text-grey-9 shadow-2">
      <q-toolbar>

        <q-toolbar-title>
          {{ $route.meta.displayName }}
        </q-toolbar-title>
        <q-btn-dropdown no-caps flat stretch class="text-subtitle1">
          <template #label>
            <q-avatar class="q-mr-sm" color="primary" text-color="white">
              {{ getInitials(getAttribute('firstName') ?? 'TodoApp') }}
            </q-avatar>
            Hello {{ getAttribute('firstName') }}
          </template>
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label>{{ getAttribute('email') }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="signOut">
              <q-item-section avatar>
                <q-avatar icon="logout" color="secondary" text-color="white" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Logout</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>


    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { getInitials } from 'src/utils';
import { useUserStore } from 'src/stores/user';
import { useRouter } from 'vue-router';
import { useQuasar, } from 'quasar';
import Parse from '../config/config';

const router = useRouter();
const $q = useQuasar();

const userStore = useUserStore();

function getAttribute(field: string) {
  return Parse.User.current()?.get(field)
}

async function signOut() {
  try {
    await userStore.logout();
    router.replace('/login')
  } catch (error: any) {
    $q.notify({
      message: error.message,
      type: 'negative',
      position: 'bottom',
      icon: 'error'
    });
  }
}
</script>
<style lang="scss">
.plan-card {
  height: 84px;
  border-radius: 6px 6px 0 0;
  background-color: #1f3847;
}
</style>


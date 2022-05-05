<template>
    <q-layout view="hHh lpR fFf" class="overflow-hidden">
        <q-page-container class="window-height">
            <div class="row justify-center items-center window-height">
                <q-card class="col-md-4 col-xl-3 v-card">
                    <q-card-section class="bg-secondary">
                        <div class="row justify-center">
                            <div class="q-pa-md">
                                <div class="q-mb-xs text-subtitle1 v-text-dark text-weight-bold">
                                    TodoApp
                                </div>
                            </div>
                        </div>
                    </q-card-section>
                    <q-card-section>
                        <div class="text-center text-secondary text-h6 text-weight-bold">
                            {{ $route.meta.displayName }}
                        </div>
                    </q-card-section>
                    <q-card-section>
                        <router-view />
                    </q-card-section>
                </q-card>
            </div>
        </q-page-container>
    </q-layout>
</template>

<script lang="ts" setup>
</script>
<style scoped>
.v-card {
    max-width: 480px;
    min-width: 360px;
}
</style>

<template>
    <v-page ref="pageRef" class="column q-pa-md">
        <task-table>
            <template #actions>
                <div class="row q-gutter-x-sm items-center">
                    <q-btn unelevated no-caps label="Add" color="primary" class="text-weight-medium"
                        @click="$refs.addDrawerRef.open()" />
                </div>
            </template>
        </task-table>
        <right-drawer ref="addDrawerRef" width="480px" label="Add Task" persistent>
            <template #actions>
                <q-btn unelevated no-caps color="primary" label="Save" :loading="loading"
                    @click="add($refs.taskFormRef, $refs.addDrawerRef)" />
            </template>
            <task-form ref="taskFormRef" />
        </right-drawer>
        <router-view v-slot="{ Component, route }">
            <template>
                <right-drawer :model-value="route.name === 'taskDetails'" ref="taskDetailsDrawerRef"
                    @update:model-value="$router.options.history.state.back ? $router.back() : $router.push({ path: '/tasks' })"
                    width="960px" :label="taskStore.taskAttributes(route.params.taskid)?.title" persistent>
                    <template #actions>
                        <q-btn unelevated no-caps color="primary" label="Save" :loading="loading"
                            @click="updateTask($refs.taskDetailsRef)" />
                    </template>
                    <component ref="taskeDetailsRef" :is="Component" :taskid="route.params.taskid" />
                </right-drawer>
            </template>
        </router-view>
    </v-page>
</template>
<script setup lang="ts">
import { useQuasar } from 'quasar';
import { useTaskStore } from '../stores/task';
import { onMounted, ref, watch } from 'vue';
import TaskTable from 'src/components/Task/TaskTable.vue';
import RightDrawer from 'src/components/common/RightDrawer.vue';
import TaskForm from '../components/Task/TaskForm.vue';
import VPage from 'components/custom/VPage.vue';
import loglevel from 'loglevel';
import { useRouter } from 'vue-router';

const $q = useQuasar();
const taskStore = useTaskStore();
const router = useRouter();

const pageRef = ref();
const loading = ref(false);
const taskDetailsDrawerRef = ref();

watch(router.currentRoute, route => {
    if (route.name === 'taskDetails') {
        taskDetailsDrawerRef.value?.open();
    }
}, { immediate: true });

onMounted(async () => {
    await taskStore.getTasks();
})


async function add(taskFormRef: InstanceType<typeof TaskForm>, addDrawerRef: InstanceType<typeof RightDrawer>) {
    loading.value = true;
    try {
        const taskDetails = await taskFormRef.save();
        if (!taskDetails) return;

        const { ...attributes } = taskDetails;
        // await taskStore.addTask({ ...attributes });

        $q.notify({
            type: 'positive',
            message: 'Task added successfully'
        });

        addDrawerRef.close();
    } catch (error) {
        loglevel.error(error);
        $q.notify({
            type: 'negative',
            message: error as string
        });
    } finally {
        loading.value = false;
    }
}

async function updateTask(taskDetailsRef: any) {
    loading.value = true;
    try {
        await taskDetailsRef.save();
    } catch (error) {
        loglevel.error(error);
    } finally {
        loading.value = false;
    }
}

</script>

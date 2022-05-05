<template>
    <v-table :rows="taskStore.tasks" :columns="columns" :filterable="true" :filterable-columns="filterableColumns"
        v-model:selected="selected" selection="multiple" :sticky-header="true"
        @row-click="(e, row) => $router.push({ name: 'taskDetails', params: { taskid: row.id } })">
        <template #actions>
            <slot name="actions" />
        </template>
        <template #row-actions="{ row }">
            <q-btn flat round dense icon="edit">
                <q-tooltip>Edit</q-tooltip>
            </q-btn>
            <q-btn flat round dense icon="delete" @click.stop="deleteTask(row)">
                <q-tooltip>Delete</q-tooltip>
            </q-btn>
        </template>
    </v-table>
</template>
<script setup lang="ts">
import { QTableColumn, useQuasar } from 'quasar';
import { useTaskStore } from '../../stores/task';
import { ref } from 'vue';
import VTable from 'src/components/custom/VTable.vue';

const $q = useQuasar();
const taskStore = useTaskStore();

const columns: QTableColumn<Parse.Object<Task>>[] = [
    {
        name: 'title',
        label: 'Title',
        field: val => val.get('title'),
        align: 'left',
        required: true,
        sortable: true
    },
    {
        name: 'description',
        label: 'Description',
        field: val => val.get('description'),
        align: 'left',
        required: true
    },
    {
        name: 'completed',
        label: 'Status',
        field: val => val.get('completed'),
        align: 'center',
    }
];

const filterableColumns = ['title', 'description', 'completed'];

const selected = ref([] as Parse.Object<Task>[]);

async function deleteTask(row: Parse.Object<Task>) {
    $q.dialog({
        title: 'Delete Task',
        message: `Are you sure you want to delete ${row.get('title')}?`,
        ok: 'Delete',
        cancel: 'Cancel',
        persistent: true
    }).onOk(async () => {
        const closeInfoNotify = $q.notify({
            type: 'info',
            message: 'Deleting Task...',
            position: 'top-right',
            spinner: true,
            spinnerSize: 'md',
            progress: false,
            closeBtn: false,
            ignoreDefaults: true
        });
        try {
            await taskStore.deleteTask(row.id);
            closeInfoNotify();
            $q.notify({
                type: 'positive',
                message: 'Task deleted successfully'
            });
        } catch (error) {
            closeInfoNotify();
            $q.notify({
                type: 'negative',
                message: error as string ?? 'Error deleting task'
            });
        }
    });
}
</script>

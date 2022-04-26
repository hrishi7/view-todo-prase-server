<script setup lang="ts">

import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

import ContainerSection from '../components/ContainerSection.vue';
import TaskCard from 'src/components/TaskCard.vue';
import { useTaskStore } from 'src/stores/task';
import { showNotify } from 'src/utils/common';


type FilterType = 'All' | 'Pending' | 'Completed';


const taskStore = useTaskStore();
const router = useRouter();
const q = useQuasar();

const options = ['All', 'Pending', 'Completed'];

const deletedId = ref('');
const model = ref<FilterType>('All');

//place for conputed
//place for watcher methods

onMounted(async () => {
  let response = await taskStore.getTasks();
  if (response.success) {
    showNotify(q, response.message, 'positive', 'success');
  } else {
    showNotify(q, response.message, 'negative', 'error');
  }
});


function deleteTask(id: string) {
  deletedId.value = id;
  // toggleModal();
  q.dialog({
    title: 'Confirm',
    message: 'Are You Sure you want to delete?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    if (deletedId.value != '') {
      deleteTaskConfirm(deletedId.value);
    }
  }).onCancel(() => {
    deletedId.value = '';
  }).onDismiss(() => {
    //nothing as of now
  })

}

async function deleteTaskConfirm(id: string) {
  let response = await taskStore.deleteTask(id);
  if (response.success) {
    showNotify(q, response.message, 'positive', 'success');
  } else {
    showNotify(q, response.message, 'negative', 'error');
  }
}
function editTask(id: string) {
  router.push(`/edit/${id}`);
}
function applyFilter() {
  if (model.value == 'Pending') {
    return taskStore.getPendingList;
  } else if (model.value == 'Completed') {
    return taskStore.getFinishedList;
  } else return taskStore.getAllList;
}
</script>

<template>
  <q-page padding>
    <ContainerSection>
      <div class="row item-center justify-between">
        <div class="col-3">
          <h5>Your Tasks</h5>
        </div>
        <div class="col-9" style="align-self: center">
          <div class="row">
            <div class="col-6">
              <q-select outlined v-model="model" :options="options" label="Select Filter"
                @update:model-value="applyFilter()" />
            </div>
            <div class="col-6 add-btn">
              <q-btn round color="positive" icon="add" to="/new"></q-btn>
            </div>
          </div>
        </div>
      </div>
      <TaskCard v-for="(task, index) in applyFilter()" :key="index" :task="task" @delete="deleteTask"
        @edit="editTask" />
      <div v-if="taskStore.tasks.length == 0">You have no Tasks..</div>
    </ContainerSection>
  </q-page>
</template>

<style scoped>
.add-btn {
  align-self: center;
  text-align: right;
}
</style>

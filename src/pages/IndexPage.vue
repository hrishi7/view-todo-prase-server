<script setup lang="ts">
import { getTasks, remove } from 'src/services/task';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import ContainerSection from '../components/ContainerSection.vue';
import TaskCard from 'src/components/TaskCard.vue';
import { useTaskStore } from 'src/stores/task';
import { showNotify } from 'src/utils/common';
import { useQuasar } from 'quasar';

const taskStore = useTaskStore();
const router = useRouter();
const q = useQuasar();

const deletedId = ref('');
const modalActive = ref(false);

type FilterType = 'All' | 'Pending' | 'Completed';
const model = ref<FilterType>('All');
const options = ['All', 'Pending', 'Completed'];

const toggleModal = () => {
  modalActive.value = !modalActive.value;
};

onMounted(async () => {
  let response = await getTasks();
  if (response.success) {
    showNotify(q, response.message, 'positive', 'success');
  } else {
    showNotify(q, response.message, 'negative', 'error');
  }
});
function deleteTask(id: string) {
  deletedId.value = id;
  toggleModal();
}
function confirmDialog() {
  toggleModal();
  if (deletedId.value != '') {
    deleteTaskConfirm(deletedId.value);
  }
}
async function deleteTaskConfirm(id: string) {
  let response = await remove(id);
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
              <q-select
                outlined
                v-model="model"
                :options="options"
                label="Select Filter"
                @update:model-value="applyFilter()"
              />
            </div>
            <div class="col-6 add-btn">
              <q-btn round color="positive" icon="add" to="/new"></q-btn>
            </div>
          </div>
        </div>
      </div>
      <TaskCard
        v-for="(task, index) in applyFilter()"
        :key="index"
        :task="task"
        :deleteTask="deleteTask"
        :editTask="editTask"
      />
      <div v-if="taskStore.tasks.length == 0">You have no Tasks..</div>

      <q-dialog v-model="modalActive" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar icon="info" color="primary" text-color="white" />
            <span class="q-ml-sm">Are You Sure you want to delete?</span>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="No" color="primary" @click="toggleModal" />
            <q-btn flat label="Yes" color="primary" @click="confirmDialog" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </ContainerSection>
  </q-page>
</template>

<style scoped>
.add-btn {
  align-self: center;
  text-align: right;
}
</style>

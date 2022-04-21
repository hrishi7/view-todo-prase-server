<script setup lang="ts">
import { getTasks, remove } from 'src/services/task';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import ContainerSection from '../components/ContainerSection.vue';
import TaskCard from 'src/components/TaskCard.vue';
import { useTaskStore } from 'src/stores/task';
import { showNotify } from 'src/utils/common';
import { useQuasar } from 'quasar';

const taskStore = useTaskStore();
const router = useRouter();
const q = useQuasar();

onMounted(async () => {
  let response = await getTasks();
  if (response.success) {
    showNotify(q, response.message, 'positive', 'success');
  } else {
    showNotify(q, response.message, 'negative', 'error');
  }
});
async function deleteTask(id: string) {
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
</script>

<template>
  <q-page padding>
    <ContainerSection>
      <div class="row item-center justify-between">
        <h5>Your Tasks</h5>
        <div class="self-center">
          <q-btn round color="positive" icon="add" to="/new"></q-btn>
        </div>
      </div>
      <TaskCard
        v-for="(task, index) in taskStore.tasks"
        :key="index"
        :task="task"
        :deleteTask="deleteTask"
        :editTask="editTask"
      />
      <div v-if="taskStore.tasks.length == 0">You have no Tasks..</div>
    </ContainerSection>
  </q-page>
</template>

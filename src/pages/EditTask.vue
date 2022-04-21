<script setup lang="ts">
import ContainerSection from 'src/components/ContainerSection.vue';
import { getTask, update } from 'src/services/task';
import Task from 'src/types';
import { onMounted, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useTaskStore } from 'src/stores/task';
import { showNotify } from 'src/utils/common';
import { useQuasar } from 'quasar';

const taskStore = useTaskStore();
const router = useRouter();
const route = useRoute();
const taskId = route.params.id as string;
const task = reactive<Task>({
  title: '',
  description: '',
  completed: false,
});
const q = useQuasar();
const onSubmit = async () => {
  const response = await update(taskId, task);
  if (response.success) {
    showNotify(q, response.message, 'positive', 'success');
    router.push('/all');
  } else {
    showNotify(q, response.message, 'negative', 'error');
  }
};

onMounted(async () => {
  if (taskId) {
    const response = await getTask(taskId);
    if (response.success) {
      showNotify(q, response.message, 'positive', 'success');
      const { title, description, completed } = taskStore.task.attributes;
      task.title = title;
      task.description = description;
      task.completed = completed;
    } else {
      showNotify(q, response.message, 'negative', 'error');
    }
  }
});
</script>

<template>
  <q-page padding>
    <ContainerSection>
      <div class="row items-center justify-center">
        <h5>Edit Task Details</h5>
      </div>
      <div class="row justify-center">
        <div class="col-xs-12 col-sm-6 col-md-4">
          <q-form @submit="onSubmit" class="q-gutter-md items-center">
            <q-input
              v-model="task.title"
              label="Title *"
              hint="Kitchen cleaning, Car Washing.."
              lazy-rules
              :rules="[
                (val) => (val !== null && val !== '') || 'Please type title',
              ]"
            />
            <q-input v-model="task.description" label="Description" />

            <q-toggle v-model="task.completed" label="Task Completed ?" />

            <div>
              <q-btn label="Submit" type="submit" color="primary" />
            </div>
          </q-form>
        </div>
      </div>
    </ContainerSection>
  </q-page>
</template>

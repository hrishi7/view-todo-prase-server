<script setup lang="ts">

import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

import ContainerSection from 'src/components/ContainerSection.vue';
import { useTaskStore } from 'src/stores/task';
import { showNotify } from 'src/utils/common';

import type Task from 'src/types';

const taskStore = useTaskStore();
const router = useRouter();
const q = useQuasar();

const task = reactive<Task>({
  title: '',
  description: '',
  completed: false,
});

const onSubmit = async () => {
  let response = await taskStore.addTask(task);
  if (response.success) {
    showNotify(q, response.message, 'positive', 'success');
    router.push('/all');
  } else {
    showNotify(q, response.message, 'negative', 'error');
  }
};
</script>

<template>
  <q-page padding>
    <ContainerSection>
      <div class="row items-center justify-center">
        <h5>Add Task Details</h5>
      </div>
      <div class="row justify-center">
        <div class="col-xs-12 col-sm-6 col-md-4">
          <q-form @submit="onSubmit" class="q-gutter-md items-center">
            <q-input v-model="task.title" label="Title *" hint="Kitchen cleaning, Car Washing.." lazy-rules :rules="[
              (val) => (val !== null && val !== '') || 'Please type title',
            ]" />
            <q-input type="textarea" v-model="task.description" label="Description" />

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

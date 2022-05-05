<script setup lang="ts">

import { onMounted, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useQuasar } from 'quasar';

import ContainerSection from 'src/components/ContainerSection.vue';
import { useTaskStore } from 'src/stores/task';
import { showNotify } from 'src/utils/common';
import Task from 'src/types';

type Mutable<Type> = {
  -readonly [Key in keyof Type]: Type[Key];
};


const taskStore = useTaskStore();
const router = useRouter();
const route = useRoute();
const q = useQuasar();

const taskId = route.params.id as string;
const task = ref<Mutable<Task>>(taskStore.task ? {
  title: taskStore.task.attributes['title'], description: taskStore.task.attributes['description'],
  completed: taskStore.task.attributes['completed']
} :
  { title: '', description: '', completed: false });

onMounted(async () => {
  if (taskId) {
    const response = await taskStore.getTask(taskId);
    if (response.success) {
      showNotify(q, response.message, 'positive', 'success');
    } else {
      showNotify(q, response.message, 'negative', 'error');
    }
  }
});

watch(taskStore, (newVal) => {
  task.value = newVal.task ? {
    title: newVal.task.attributes['title'], description: newVal.task.attributes['description'],
    completed: newVal.task.attributes['completed']
  } :
    { title: '', description: '', completed: false }
})

const onSubmit = async () => {
  const response = await taskStore.editTask(taskId, task.value);
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
        <h5>Edit Task Details</h5>
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

<script setup lang="ts">
import { getTasks } from 'src/services/task';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import ContainerSection from '../components/ContainerSection.vue';
import TaskCard from '../components/TaskCard.vue';
import { useTaskStore } from 'src/stores/task';

const taskStore = useTaskStore();
const router = useRouter();

onMounted(async () => {
  await getTasks();
});
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
        @click="router.push(`/edit/${task.id}`)"
      />
      <div v-if="taskStore.tasks.length == 0">You have no Tasks..</div>
    </ContainerSection>
  </q-page>
</template>

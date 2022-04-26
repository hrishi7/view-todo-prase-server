<script setup lang="ts">
import Parse from 'parse/dist/parse.min';
import Task from 'src/types';
interface PropsType {
  task: Parse.Object<Task>;
};
const props = defineProps<PropsType>();


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const emits = defineEmits<{
  (e: 'delete', id: string): void
  (e: 'edit', id: string): void
}>()
</script>

<template>
  <q-card flat bordered class="q-mb-sm cursor-pointer"
    v-bind:class="{ completed: props.task.get('completed') == true }">
    <q-card-section class="q-pt-xs">
      <div class="text-h5 q-mt-sm q-mb-xs" v-bind:class="{ completedTitle: props.task.get('completed') == true }">
        {{ props.task.get('title') }}
      </div>
      <div class="text-caption text-grey">
        {{ props.task.get('description') }}
      </div>
    </q-card-section>
    <q-card-actions>
      <q-btn round unelevated color="negative" class="text-white" icon="delete"
        @click="$emit('delete', props.task.id)" />
      <q-btn unelevated round color="secondary" class="text-white" icon="edit" @click="$emit('edit', props.task.id)" />
    </q-card-actions>
  </q-card>
</template>

<style scoped>
.completed {
  background-color: pink;
  transform: rotate(-1deg) translateX(0) translateY(-1px);
}

.completedTitle {
  text-decoration: line-through;
}
</style>

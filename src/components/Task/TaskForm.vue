<template>
    <q-form ref="taskFormRef" class="q-pa-md column q-gutter-y-sm">
        <v-input v-model="_task.title" label="Titlee" :rules="[required, val => isLength(val, { min: 1, max: 50 })]" />
        <v-input v-model="_task.description" type="textarea" label="Description" :rules="[required]" />
        <v-toggle v-model="_task.completed" color="green" :label="_task.completed ? 'Completed' : 'Pending'"
            right-label />

    </q-form>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import VInput from '../../components/custom/VInput.vue';
import VToggle from '../../components/custom/VToggle.vue';
import { required, isLength } from 'src/utils/validation-rules';

interface Props {
    task?: {
        title: TaskAttributes['title'];
        description: TaskAttributes['description'];
        completed: TaskAttributes['completed'];
    }
}

const props = withDefaults(defineProps<Props>(), {
    task: () => ({
        title: '',
        description: '',
        completed: false
    })
});

const _task = ref(props.task);

const taskFormRef = ref();

async function save() {
    if (!await taskFormRef.value.validate()) return;

    return _task.value;
}

defineExpose({
    save
});
</script>

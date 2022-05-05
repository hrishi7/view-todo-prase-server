<template>
    <q-form ref="formRef" class="q-pa-md column q-gutter-y-sm">
        <q-input v-model="_task.title" label="Titlee" :rules="[required, val => isLength(val, { min: 2, max: 15 })]" />
        <q-input v-model="_task.description" type="textarea" label="Description" :rules="[required]" />
        <q-toggle v-model="_task.completed" color="green" :label="_task.completed ? 'completed' : 'pending'"
            right-label />

    </q-form>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import VInput from '../../components/custom/VInput.vue';
import { required, isLength } from 'src/utils/validation-rules';

interface Props {
    task?: {
        title: Task['title'];
        description: Task['description'];
        completed?: boolean;
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

const formRef = ref();

async function save() {
    if (!await formRef.value.validate()) return;

    return _task.value;
}

defineExpose({
    save
});
</script>

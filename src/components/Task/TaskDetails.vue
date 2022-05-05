<template>
    <q-form ref="formRef" class="col">
        <div class="row q-gutter-sm">
            <q-input v-model="attributes.title" label="Title" class="col-8 col-md"
                :rules="[required, val => isLength(val, { min: 1, max: 15 })]" />
        </div>
        <div class="row q-gutter-sm">
            <q-input v-model="attributes.description" type="textarea" label="Description" class="col-8 col-md"
                :rules="[required]" />
        </div>
        <div class="row q-gutter-sm">
            <q-toggle v-model="attributes.completed" color="green" class="col-8 col-md"
                :label="attributes.completed ? 'completed' : 'pending'" right-label />
        </div>
    </q-form>
</template>

<script setup lang="ts">
import { useTaskStore } from '../../stores/task';
import { ref } from 'vue';
import VInput from '../custom/VInput.vue';
import { required, isLength } from '../../utils/validation-rules';
import { useQuasar, } from 'quasar';

interface Props {
    taskid: string;
}

const props = defineProps<Props>();
console.log("taskdetail", props.taskid);

const $q = useQuasar();
const taskStore = useTaskStore();


const attributes = ref({ ...taskStore.taskAttributes(props.taskid) });
console.log(attributes.value, ...taskStore.tasksAttributes);
const formRef = ref();

async function save() {
    if (!await formRef.value?.validate()) return;

    try {
        await taskStore.editTask(props.taskid, attributes.value);
        $q.notify({
            color: 'positive',
            message: 'Task Updated Successfully'
        })
    } catch (error) {
        $q.notify({
            message: error as string,
            color: 'negative'
        })
    }
}
defineExpose({ save })
</script>
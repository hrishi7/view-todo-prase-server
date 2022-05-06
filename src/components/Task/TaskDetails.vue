<template>
    <q-form ref="formRef" class="col">
        <div class="row q-gutter-sm">
            <v-input v-model="attributes.title" label="Title" class="col-8 col-md"
                :rules="[required, val => isLength(val, { min: 1, max: 50 })]" />
        </div>
        <div class="row q-gutter-sm">
            <v-input v-model="attributes.description" type="textarea" label="Description" class="col-8 col-md"
                :rules="[required]" />
        </div>
        <div class="row q-gutter-sm">
            <v-toggle v-model="attributes.completed" color="green" class="col-8 col-md"
                :label="attributes.completed ? 'completed' : 'pending'" right-label />
        </div>
        <div class="col row items-center q-gutter-sm">
            <div class="q-md-xs text-subtitle1 v-text-dark">
                Last Updated On
            </div><span class="text-weight-bold">{{ moment(attributes.updatedAt).format('MMMM Do YYYY') }}</span>
        </div>
        <div class="col row items-center q-gutter-sm">
            <div class="q-md-xs text-subtitle1 v-text-dark">
                Task Created On:
            </div><span class="text-weight-bold">{{ moment(attributes.createdAt).format('MMMM Do YYYY') }}</span>
        </div>
    </q-form>
</template>

<script setup lang="ts">
import { useTaskStore } from '../../stores/task';
import { ref } from 'vue';
import VInput from '../custom/VInput.vue';
import VToggle from '../custom/VToggle.vue';
import { required, isLength } from '../../utils/validation-rules';
import { useQuasar, } from 'quasar';
import moment from 'moment'

interface Props {
    taskid: string;
}

const props = defineProps<Props>();
console.log('taskdetail', props.taskid);

const $q = useQuasar();
const taskStore = useTaskStore();


const attributes = ref<TaskAttributes>({ ...taskStore.taskAttributes(props.taskid) });
console.log(typeof attributes.value.updatedAt);
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
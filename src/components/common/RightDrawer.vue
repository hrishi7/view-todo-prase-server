
<template>
    <q-dialog ref="dialogRef" v-model="opened" @update:model-value="emit('update:model-value', $event)" position="right"
        full-height minimized :persistent="persistent">
        <q-card class="column" :style="cardStyle">
            <q-card-section class="row flex-center">
                <div class="text-h5 text-weight-bold text-secondary">
                    {{ $props.label }}
                </div>
                <q-space class="col" />
                <slot name="actions" />
                <div class="q-pa-md">
                    <q-btn flat round icon="close" @click="$refs.dialogRef.toggle()" />
                </div>
            </q-card-section>
            <q-card-section class="col">
                <slot />
            </q-card-section>
        </q-card>

    </q-dialog>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { QDialog } from 'quasar';
import { LiteralUnion } from 'type-fest'

interface Props {
    modelValue?: boolean;
    label?: string;
    width?: LiteralUnion<'auto' | '840px' | '480px', string>;
    persistent?: boolean
}

interface Emits {
    (event: 'update:model-value', data: boolean): void
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: false,
    label: '',
    width: '840px',
    persistent: false
});

const emit = defineEmits<Emits>();

const opened = ref(props.modelValue);

const cardStyle = computed(() => { return { width: props.width } });

function open() {
    opened.value = true
}

function close() {
    opened.value = false
}

function toggle() {
    opened.value = !opened.value
}

defineExpose({
    open, close, toggle
})
</script>
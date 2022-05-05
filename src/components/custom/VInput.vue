<template>
    <div class="$attr.class">
        <div class="q-md-xs text-subtitle2 v-text-dark">
            <slot name="label">
                {{ attrs.label }} <span v-if="$attrs.required" class="text-red">
                    *
                </span>
            </slot>
        </div>
        <q-input ref="qInputRef" v-bind="attrs" :model-value="props.modelValue" @update:model-value="onModelValueUpdate"
            :outlined="props.outlined" :bg-color="props.bgColor" :label="void 0">

            <template v-for="(_, slot) of slots" #[slot]="scope">
                <slot :name="slot" v-bind="scope ?? {}" />
            </template>

        </q-input>
    </div>
</template>

<script setup lang="ts">
import { computed, useAttrs, ref, useSlots } from 'vue'
type QInput = import('quasar').QInput;
type QInputProps = import('quasar').QInputProps;

interface Props extends QInputProps {
    modelValue: string | number | null | undefined;
    bgColor?: string,
    outlined?: boolean
}

interface Emits {
    (event: 'update:model-value', value: Props['modelValue']): void
}

const props = withDefaults(defineProps<Props>(), {
    bgColor: 'grey-1',
    outlined: true
});


const emit = defineEmits<Emits>();

const qInput = ref<QInput | null>(null);

const attrs = computed(() => {
    const { class: _, required, ...others } = useAttrs();
    return others;
});
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const slots = computed(() => {
    const { label: _, ...others } = useSlots();
    return others
});

console.log(attrs.value, slots, props);
function onModelValueUpdate($event: string | number | null) {
    let value = null;
    if (typeof $event === 'string')
        value = $event.length ? $event : null
    if (typeof $event === 'number')
        value = $event
    emit('update:model-value', value)
}

defineExpose({
    validate: (val?: unknown) => qInput.value?.validate(val),
    resetvalidation: () => qInput.value?.resetValidation(),
    focus: () => qInput.value?.focus(),
    blur: () => qInput.value?.blur(),
    select: () => qInput.value?.select(),
    getNativeElement: () => qInput.value?.getNativeElement()
})
</script>
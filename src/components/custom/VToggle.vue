<template>
  <div :class="$attrs.class" class="row">
    <div class="col">
      <div class="q-mb-xs text-subtitle1 text-secondary text-weight-bold">
        {{ attrs.label }}
      </div>
      <slot name="caption">
        <div class="v-text-medium text-subtitle2">
          {{ props.caption }}
        </div>
      </slot>
    </div>
    <q-space />
    <q-toggle ref="qToggleRef" outlined v-bind="attrs" :label="void 0" bg-color="grey-1">
      <template v-for="(_, slot) of slots" #[slot]="scope">
        <slot :name="slot" v-bind="scope ?? {}" />
      </template>
    </q-toggle>
  </div>
</template>

<script lang="ts" setup>
import { computed, useAttrs, ref, useSlots } from 'vue';

type QToggle = import('quasar').QToggle;
type QToggleProps = import('quasar').QToggleProps;

// defineProps only accepts interface types. so we need to convert type to an interface
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props extends QToggleProps {
  modelvalue?: boolean,
  caption?: string;
}

const props = defineProps<Props>();

const attrs = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { class: _, ...others } = useAttrs();
  return others;
});
// @ts-ignore 
const slots: { [key: unknown]: any } = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { caption: _, ...others } = useSlots();
  return others;
});

const qToggleRef = ref<QToggle | null>(null);

// expose q-input methods
defineExpose({
  toggle: () => qToggleRef.value?.toggle()
});

</script>

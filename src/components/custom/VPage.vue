<template>
  <q-page
    :style-fn="styleFn"
    :padding="props.padding"
    v-bind="$attrs"
  >
    <slot />
  </q-page>
</template>
<script setup lang="ts">

interface Props {
  padding?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  padding: false
});

function styleFn(offset: number, height: number) {
  return {
    height: height - offset + 'px'
  };
}
</script>

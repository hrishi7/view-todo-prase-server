<template>
    <div class="$attrs.class">
        <div class="q-md-xs text-subtitle1 v-text-dark text-weight-bold">
            {{ $props.label }}
        </div>
        <slot name="caption">
            <div v-if="props.caption" class="v-text-medium text-subtitle2">
                {{ props.caption }}
            </div>
        </slot>
    </div>
</template>

<script setup lang="ts">
interface Props {
    label?: string, caption?: string
}
const props = defineProps<Props>();
</script>
<template>
  <div class="bg-todo">
    <router-view :class="{ 'q-mx-auto': true }" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App'
});
</script>

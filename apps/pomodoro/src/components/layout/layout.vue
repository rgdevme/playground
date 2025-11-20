<script setup lang="ts">
import { onMounted } from 'vue';
import { settings } from '../../context/settings';
import Queue from '../queue/queue.vue';
import Settings from '../settings/settings.vue';
import Timer from '../timer/timer.vue';

onMounted(() => {
  document.documentElement.style.setProperty("--bg", settings.color);
})
</script>

<template>
  <Timer v-if="settings.tab === 'timer'" />
  <Settings />
  <Queue />
</template>

<style scoped lang="scss"></style>

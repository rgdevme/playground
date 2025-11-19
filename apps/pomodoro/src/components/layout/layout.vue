<script setup lang="ts">
import { useSettings } from '../../context/settings';
import Queue from '../queue/queue.vue';
import Settings from '../settings/settings.vue';
import Timer from '../timer/timer.vue';

const settings = useSettings()

</script>

<template>
  <Timer v-if="settings.tab === 'timer'" />
  <Settings v-else />
  <Queue />
</template>

<style scoped lang="scss"></style>

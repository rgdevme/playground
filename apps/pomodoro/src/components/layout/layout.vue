<script setup lang="ts">
import { onMounted } from 'vue';
import { settings } from '../../context/settings';
import Settings from '../settings/settings.vue';
import Timer from '../timer/timer.vue';

onMounted(() => {
  document.documentElement.style.setProperty("--bg", settings.color);
})
</script>

<template>
  <Timer />
  <Settings />
  <!-- <Queue /> -->
</template>

<style scoped lang="scss"></style>

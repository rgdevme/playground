<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

// defineProps<{}>()
const rounds = 12
const round = { label: 'Focus', index: 1, seconds: 15 * 60, startedAt: Date.now() }

const seconds = ref(0)
const elapsed = computed(() => ({
  seconds: seconds.value % 60,
  minutes: Math.floor(seconds.value / 60)
}))

onMounted(() => {
  setInterval(() => seconds.value++, 1000)
})

</script>

<template>
  <div class="timer">
    <div class="round-label">{{ round.label }}</div>
    <div class="round-index">({{ round.index }} / {{ rounds }})</div>
    <div class="dial"></div>
    <div class="time">{{ elapsed.minutes }}:{{ elapsed.seconds }}</div>
    <div class="control"></div>
    <div class="skip"></div>
    <div class="sound"></div>
  </div>
</template>

<style scoped></style>

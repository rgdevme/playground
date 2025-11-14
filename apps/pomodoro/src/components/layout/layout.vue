<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

// defineProps<{}>()
const pendingRounds = ref([
  { label: 'Focus', seconds: 0.5 * 60 },
  { label: 'Break', seconds: 0.25 * 60 },
  { label: 'Focus', seconds: 0.5 * 60 },
  { label: 'Break', seconds: 0.25 * 60 },
])
const round = computed(() => {
  return { ...pendingRounds.value[0], index: finishedRounds.value.length + 1, startedAt: Date.now() }
})

const finishedRounds = ref([] as typeof pendingRounds.value)

const seconds = ref(0)
const elapsed = computed(() => ({
  seconds: (seconds.value % 60).toString().padStart(2, '0'),
  minutes: Math.floor(seconds.value / 60).toString().padStart(2, '0')
}))

onMounted(() => {
  const interval = setInterval(() => {
    if (seconds.value >= (round.value.seconds ?? 0)) {
      if (pendingRounds.value.length <= 1) clearInterval(interval)
      else {
        finishedRounds.value.push(pendingRounds.value.splice(0, 1)[0])
        seconds.value = 0
      }
    } else seconds.value++
  }, 100)
})

</script>

<template>
  <div class="timer">
    <div class="round-label">{{ round.label }}</div>
    <div class="round-index">({{ round.index }} / {{ pendingRounds.length + finishedRounds.length }})</div>
    <div class="dial"></div>
    <div class="time">{{ elapsed.minutes }}:{{ elapsed.seconds }}</div>
    <div class="control"></div>
    <div class="skip"></div>
    <div class="sound"></div>
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
import { computed, ref } from 'vue'
import chord from '../../../assets/chord.wav'
import chord2 from '../../../assets/chord2.wav'
import calm from '../../../assets/calm.wav'
import dial from '../dial/dial.vue'

enum TimerType {
  FOCUS,
  BREAK
}

export type Timer = {
  index: number;
  label: string;
  type: TimerType;
  seconds: number;
}

const sounds = ref({
  [TimerType.FOCUS]: new Audio(chord),
  [TimerType.BREAK]: new Audio(chord2),
  stop: new Audio(calm)
})

const intervalSize = 100

// defineProps<{}>()
const pendingRounds = ref<Timer[]>([
  { label: 'Focus', type: TimerType.FOCUS, seconds: 0.5 * 60 },
  { label: 'Break', type: TimerType.BREAK, seconds: 0.25 * 60 },
  { label: 'Focus', type: TimerType.FOCUS, seconds: 0.5 * 60 },
  { label: 'Break', type: TimerType.BREAK, seconds: 0.25 * 60 },
].map((r, i) => ({ ...r, index: i + 1, seconds: r.seconds })))

const round = computed(() => {
  const currentTimer = pendingRounds.value[0] ?? finishedRounds.value[0]
  return { ...currentTimer, startedAt: Date.now() }
})

const finishedRounds = ref([] as typeof pendingRounds.value)

const seconds = ref(0)

const elapsed = computed(() => ({
  seconds: (seconds.value % 60).toString().padStart(2, '0'),
  minutes: Math.floor(seconds.value / 60).toString().padStart(2, '0')
}))

const interval = ref<number | undefined>(undefined)
const status = ref<'play' | 'pause' | 'stop'>('stop')

const startTimer = () => {
  clearInterval(interval.value)
  status.value = 'play'

  interval.value = setInterval(() => {
    if (seconds.value >= (round.value?.seconds ?? 0)) {
      if (pendingRounds.value.length <= 1) {
        stopTimer()
        playSoundStop()
      }
      else {
        nextTimer()
        playSoundNext()
      }
    } else seconds.value++
  }, 1000)
}

const playSoundNext = () => {
  const { type } = pendingRounds.value[0]
  const sound = sounds.value[type]
  sound.play()
}

const playSoundStop = () => {
  const sound = sounds.value.stop
  sound.play()
}

const nextTimer = () => {
  finishedRounds.value.unshift(...pendingRounds.value.splice(0, 1))
  seconds.value = 0
}

const prevTimer = () => {
  pendingRounds.value.unshift(...finishedRounds.value.splice(0, 1))
  seconds.value = 0
}

const pauseTimer = () => {
  clearInterval(interval.value)
  status.value = 'pause'
}

const stopTimer = () => {
  pauseTimer()
  status.value = 'stop'
  seconds.value = 0
}

const resetTimer = () => {
  stopTimer()
  pendingRounds.value = [...finishedRounds.value, ...pendingRounds.value]
  finishedRounds.value = []
}

</script>

<template>
  <div class="timer">
    <dial :timer="round" color="green" :status="status" />
    <div class="round-label">{{ round.label }}</div>
    <div class="round-index">({{ round.index }} / {{ pendingRounds.length + finishedRounds.length }})</div>
    <div class="dial"></div>
    <div class="time">{{ elapsed.minutes }}:{{ elapsed.seconds }}</div>
    <div class="control">
      <button @click="pauseTimer">pause</button>
      <button @click="startTimer">play</button>
      <button @click="stopTimer">stop</button>
      <button @click="resetTimer">reset</button>
      <button @click="nextTimer">next</button>
      <button @click="prevTimer">prev</button>
    </div>
    <div class="skip"></div>
    <div class="sound"></div>
  </div>
</template>

<style scoped></style>

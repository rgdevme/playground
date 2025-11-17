<script setup lang="ts">
import { ref } from 'vue'
import calm from '../../../assets/calm.wav'
import chord from '../../../assets/chord.wav'
import chord2 from '../../../assets/chord2.wav'
import { useQueue } from '../../hooks/useQueue'
import { useTimer } from '../../hooks/useTimer'
import { Timer, TimerType } from '../../types'
import dial from '../dial/dial.vue'

const sounds = ref({
  [TimerType.FOCUS]: new Audio(chord),
  [TimerType.BREAK]: new Audio(chord2),
  stop: new Audio(calm)
})

const queue = useQueue<Timer>({
  items: [
    { label: 'Focus', type: TimerType.FOCUS, seconds: 0.5 * 60 },
    { label: 'Break', type: TimerType.BREAK, seconds: 0.25 * 60 },
    { label: 'Focus', type: TimerType.FOCUS, seconds: 0.5 * 60 },
    { label: 'Break', type: TimerType.BREAK, seconds: 0.25 * 60 },
  ].map((r, i) => ({ ...r, index: i + 1, seconds: r.seconds })),
  onChange: (current, i, prev, q) => {
    if (i === (q.length - 1)) {
      timer.value.stop()
      if (!muted.value) sounds.value.stop.play()
    } else {
      timer.value.setDuration(current.seconds)
      timer.value.play()
      if (Math.abs(i - prev) === 1 && !muted.value) {
      sounds.value[current.type].play()
      }
    }
  }
})

const timer = useTimer({
  duration: queue.value.status.current.seconds,
  onFinished: () => queue.value.next()
})

</script>

<template>
  <div class="timer">
    <dial :timer="queue.status.current" color="green" :status="timer.status" />
    <div class="currentTimer-label">{{ queue.status.current.label }}</div>
    <div class="time">{{ timer.elapsed.minutes }}:{{ timer.elapsed.seconds }}</div>
    <div class="currentTimer-index">({{ queue.status.current.index }} / {{ queue.length }})</div>
    <div class="control">
      <button v-if="timer.status === 'play'" @click="timer.pause">pause</button>
      <button v-else @click="timer.play">play</button>
      <button v-if="timer.status !== 'stop'" @click="timer.stop">stop</button>
      <button v-if="queue.index > 0" @click="() => queue.goTo(0)">reset</button>
      <button v-if="queue.index < queue.length - 1" @click="queue.next">next</button>
      <button v-if="queue.index > 0" @click="queue.previous">prev</button>
    </div>
  </div>
</template>

<style scoped></style>

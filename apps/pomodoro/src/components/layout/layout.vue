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
      timer.stop()
      sounds.value.stop.play()
    } else {
      timer.setDuration(current.seconds)
      timer.play()
      sounds.value[current.type].play()
    }
  }
})

const timer = useTimer({
  duration: queue.status.value.current.seconds,
  onFinished: () => queue.next()
})

</script>

<template>
  <div class="timer">
    <dial :timer="queue.status.value.current" color="green" :status="timer.status.value" />
    <div class="currentTimer-label">{{ queue.status.value.current.label }}</div>
    <div class="currentTimer-index">({{ queue.status.value.current.index }} / {{ queue.status.value.pending.length +
      queue.length }})
    </div>
    <div class="dial"></div>
    <div class="time">{{ timer.elapsed.value.minutes }}:{{ timer.elapsed.value.seconds }}</div>
    <div class="control">
      <button @click="timer.pause">pause</button>
      <button @click="timer.play">play</button>
      <button @click="timer.stop">stop</button>
      <button @click="() => queue.goTo(0)">reset</button>
      <button @click="queue.next">next</button>
      <button @click="queue.previous">prev</button>
    </div>
    <div class="skip"></div>
    <div class="sound"></div>
  </div>
</template>

<style scoped></style>

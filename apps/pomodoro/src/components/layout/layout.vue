<script setup lang="ts">
import {
  IconArrowBackUpDouble,
  IconBellRingingFilled,
  IconBellXFilled,
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
  IconPlayerSkipBackFilled,
  IconPlayerSkipForwardFilled,
  IconPlayerStopFilled,
} from '@tabler/icons-vue'
import { ref } from 'vue'
import calm from '../../../assets/calm.wav'
import chord from '../../../assets/chord.wav'
import chord2 from '../../../assets/chord2.wav'
import { useQueue } from '../../hooks/useQueue'
import { useTimer } from '../../hooks/useTimer'
import { Timer, TimerType } from '../../types'
import btn from '../button/btn.vue'
import dial from '../dial/dial.vue'

const sounds = ref({
  [TimerType.FOCUS]: new Audio(chord),
  [TimerType.BREAK]: new Audio(chord2),
  stop: new Audio(calm)
})

const muted = ref(false)
const toggleMute = () => muted.value = !muted.value

const queue = useQueue<Timer>({
  items: [
    { label: 'Focus', type: TimerType.FOCUS, seconds: 0.5 * 60 },
    { label: 'Break', type: TimerType.BREAK, seconds: 0.25 * 60 },
    { label: 'Focus', type: TimerType.FOCUS, seconds: 0.5 * 60 },
    { label: 'Break', type: TimerType.BREAK, seconds: 0.25 * 60 },
  ].map((r, i) => ({ ...r, index: i + 1, seconds: r.seconds })),
  onFinish: () => {
    timer.value.stop()
    if (!muted.value) sounds.value.stop.play()
  },
  onChange: ({ item, stepSize }) => {
    timer.value.setDuration(item.seconds)
    if (Math.abs(stepSize) === 1) timer.value.play()
    if (!muted.value) {
      sounds.value[item.type].volume = 0.2
      sounds.value[item.type].play()
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
    <dial :class="`status-${timer.status}`" :timer="queue.status.current" color="hsl(162, 85%, 50%)"
      :status="timer.status" />
    <div class="label">{{ queue.status.current.label }}</div>
    <div :class="`time status-${timer.status}`" style="--color: hsl(162, 85%, 50%);">{{ timer.elapsed.minutes }}:{{
      timer.elapsed.seconds }}</div>
    <div class="index">({{ queue.status.current.index }} / {{ queue.length }})</div>
    <btn v-if="timer.status === 'play'" class="play" @click="timer.pause">
      <IconPlayerPauseFilled />
    </btn>
    <btn v-else class="play" @click="timer.play">
      <IconPlayerPlayFilled />
    </btn>
    <btn v-if="timer.status !== 'stop'" class="stop" @click="timer.stop">
      <IconPlayerStopFilled />
    </btn>
    <btn v-else :disable="queue.index === 0" class="stop" @click="() => queue.goTo(0)">
      <IconArrowBackUpDouble />
    </btn>
    <btn :disable="queue.index >= queue.length - 1" class="next" @click="queue.next">
      <IconPlayerSkipForwardFilled />
    </btn>
    <btn :disable="queue.index === 0" class="prev" @click="queue.previous">
      <IconPlayerSkipBackFilled />
    </btn>
    <btn class="vol" @click="toggleMute">
      <IconBellXFilled v-if="muted" />
      <IconBellRingingFilled v-else />
    </btn>
  </div>
</template>

<style scoped lang="scss">
.timer {
  padding: 1rem;
  /* border-radius: 1rem; */
  /* box-shadow: 0 0 1rem 0.5rem rgba(0, 0, 0, 0.15); */
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  position: relative;
  text-align: center;

  display: grid;
  justify-content: center;
  justify-items: center;
  align-items: center;
  gap: 2rem;
  grid-template:
    'label  label  label    label  label' 1rem
    'dial   dial   dial     dial    dial' auto
    'stop   prev   play     next     vol' 1rem
    'index  index  index    index  index' 1rem
    / 1fr 1fr 1fr 1fr 1fr;
}

.time {
  position: absolute;
  top: calc(50% - 1rem);
  left: 50%;
  transform: translate(-50%, -50%);
  vertical-align: middle;
  font-size: 24px;
  line-height: 1em;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.15);

  &.status- {
    &play {
      color: var(--color);
    }
  }
}

.dial {
  grid-area: dial;
}

.label {
  grid-area: label;
  font-size: 14px;
  font-weight: bold;
  opacity: 0.35;
}

.index {
  grid-area: index;
  font-size: 12px;
  font-weight: bold;
  opacity: 0.35;
}

/* .controls {
  grid-area: ctrl;

  display: flex;
  justify-content: center;
  gap: 0.5rem;
} */

.play {
  grid-area: play;
}

.reset {
  grid-area: reset;
}

.stop {
  grid-area: stop;
}

.vol {
  grid-area: vol;
}

.next {
  grid-area: next;
}

.prev {
  grid-area: prev;
}
</style>

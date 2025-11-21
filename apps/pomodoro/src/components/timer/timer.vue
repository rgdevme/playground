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
  IconSettingsFilled
} from '@tabler/icons-vue'
import { onMounted, ref } from 'vue'
import calm from '../../../assets/calm.wav'
import chord from '../../../assets/chord.wav'
import chord2 from '../../../assets/chord2.wav'
import { settings } from '../../context/settings'
import { useQueue } from '../../hooks/useQueue'
import { useRounds } from '../../hooks/useRounds'
import { useTimer } from '../../hooks/useTimer'
import { Timer, TimerType } from '../../types'
import btn from '../button/btn.vue'
import dial from '../dial/dial.vue'

const sounds = ref({
  [TimerType.FOCUS]: new Audio(chord),
  [TimerType.BREAK]: new Audio(chord2),
  stop: new Audio(calm)
})

const toggleMute = () => settings.muted = !settings.muted
const openSettings = () => {
  settings.tab = 'settings'
}

const [queue, { enqueue, next, previous, goTo }] = useQueue<Timer>({
  onEnqueue: ([first]) => controls.set(first?.seconds),
  onFinish: ({ item }) => {
    stop()
    if (!settings.muted) item.sound.play()
  },
  onChange: ({ item, stepSize }) => {
    controls.set(item.seconds)
    if (Math.abs(stepSize) === 1) controls.play()
    if (!settings.muted) {
      console.log(item);
      
      item.sound.play()
      // item.sound.volume = settings.volume
    }
  }
})
useRounds({ onChange: enqueue })
const [timer, controls] = useTimer({ onFinished: next })

onMounted(() => {
  if (settings.startOnOpen) controls.play()
})

</script>

<template>
  <div v-if="queue.current" class="timer">
    <btn class="gears" @click="openSettings">
      <IconSettingsFilled />
    </btn>
    <div class="label">{{ queue.current.label }}</div>
    <div class="time-dial">
      <dial :class="`status-${timer.status}`" :timer="queue.current" :color="settings.color" :status="timer.status" />
      <div :class="`time status-${timer.status}`" style="--color: {{ settings.color }};">
        {{ timer.minutes }}:{{ timer.seconds }}
      </div>
    </div>
    <div class="index">({{ queue.current.index }} / {{ queue.length }})</div>
    <btn v-if="timer.status === 'play'" class="play" @click="controls.pause">
      <IconPlayerPauseFilled />
    </btn>
    <btn v-else class="play" @click="controls.play">
      <IconPlayerPlayFilled />
    </btn>
    <btn v-if="timer.status !== 'stop'" class="stop" @click="controls.stop">
      <IconPlayerStopFilled />
    </btn>
    <btn v-else :disable="queue.index === 0" class="stop" @click="() => goTo(0)">
      <IconArrowBackUpDouble />
    </btn>
    <btn :disable="queue.index >= queue.length - 1" class="next" @click="next">
      <IconPlayerSkipForwardFilled />
    </btn>
    <btn :disable="queue.index === 0" class="prev" @click="previous">
      <IconPlayerSkipBackFilled />
    </btn>
    <btn class="vol" @click="toggleMute">
      <IconBellXFilled v-if="settings.muted" />
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
  row-gap: clamp(2px, 3vh, 2rem);
  column-gap: clamp(2px, 3vw, 2rem);
  grid-template:
    '.      label  label    label  gears' 1rem
    'dial   dial   dial     dial    dial' auto
    'stop   prev   play     next     vol' 1rem
    'index  index  index    index  index' 1rem
    / 1fr 1fr 1fr 1fr 1fr;
}

.time {
  position: absolute;
  top: calc(50% - 0.5rem);
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

.time-dial {
  grid-area: dial;
  position: relative;
  width: 100%;
  max-width: 100vw;
  aspect-ratio: 1;
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

.gears {
  grid-area: gears;
}

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

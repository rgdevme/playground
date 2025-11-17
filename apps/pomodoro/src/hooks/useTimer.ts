import { computed, ref } from "vue"

export const useTimer = ({
  duration,
  onFinished
}: {
  duration: number,
  onFinished?: () => void
}) => {
  const interval = ref<number | undefined>(undefined)
  const clear = () => clearInterval(interval.value)

  const dur = ref(duration)
  const status = ref<'play' | 'pause' | 'stop'>('stop')
  const tracked = ref(0)
  const elapsed = computed(() => ({
    seconds: (tracked.value % 60).toString().padStart(2, '0'),
    minutes: Math.floor(tracked.value / 60).toString().padStart(2, '0')
  }))

  const play = () => {
    clear()
    status.value = 'play'
    interval.value = setInterval(() => {
      if (tracked.value < dur.value) tracked.value++
      else {
        stop()
        onFinished?.()
      }
    }, 1000)
  }

  const pause = () => {
    clear()
    status.value = 'pause'
  }

  const stop = () => {
    clear()
    status.value = 'stop'
    tracked.value = 0
  }

  const setDuration = (value: number) => dur.value = value

  return {
    play,
    pause,
    stop,
    setDuration,
    elapsed,
    status,
    total: tracked
  }
}
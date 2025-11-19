import { computed, ref } from "vue"
import { useSettings } from "../context/settings"

export const useTimer = ({
  onFinished
}: {
  onFinished?: () => void
}) => {
  const { direction } = useSettings()
  const interval = ref<number | undefined>(undefined)
  const clear = () => clearInterval(interval.value)

  const duration = ref(0)
  const status = ref<'play' | 'pause' | 'stop'>('stop')
  const tracked = ref(0)

  const play = () => {
    clear()
    status.value = 'play'
    interval.value = setInterval(() => {
      if (tracked.value < duration.value) tracked.value++
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

  const set = (value: number) => duration.value = value

  const methods = {
    play,
    pause,
    stop,
    set
  }

  const state = computed(() => {
    const forward = direction === 'up'
    const elapsedSeconds = tracked.value % 60
    const totalSeconds = duration.value % 60
    const seconds = forward ? elapsedSeconds : totalSeconds - elapsedSeconds
    const elapsedMinutes = Math.floor(tracked.value / 60)
    const totalMinutes = Math.floor(duration.value / 60)
    const minutes = forward ? elapsedMinutes : totalMinutes- elapsedMinutes
    return ({
      duration: duration.value,
      status: status.value,
      elapsed: tracked.value,
      seconds: seconds.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0')
    })
  })

  return [state, methods] as [typeof state, typeof methods]
}
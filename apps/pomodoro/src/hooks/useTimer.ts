import { computed, ref } from "vue"
import { settings } from "../context/settings"

export const useTimer = ({
  onFinished
}: {
  onFinished?: () => void
}) => {
  const interval = ref<number | undefined>(undefined)
  const clear = () => clearInterval(interval.value)

  const duration = ref(0)
  const status = ref<'play' | 'pause' | 'stop'>('stop')
  const tracked = ref(0)

  const countUp = () => {
    const seconds = tracked.value % 60
    const minutes = Math.floor(tracked.value / 60)
    return { seconds, minutes }
  }

  const countDown = () => {
    const elapsedSeconds = tracked.value % 60
    const totalSeconds = duration.value % 60
    const seconds = (59 - totalSeconds) - elapsedSeconds
    const elapsedMinutes = Math.floor(tracked.value / 60)
    const totalMinutes = Math.floor(duration.value / 60)
    const minutes = totalMinutes - elapsedMinutes
    return { seconds, minutes }
  }

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
    const { seconds, minutes } = settings.countdown ? countDown() : countUp()
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
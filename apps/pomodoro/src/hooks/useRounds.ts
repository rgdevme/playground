import { onMounted, ref, watch } from "vue"
import { settings } from "../context/settings"
import { Timer } from "../types"

export const useRounds = ({ onChange }: { onChange: (items: Timer[]) => void }) => {
  const queue = ref([] as Timer[])

  const update = () => {
    const r = generateRounds()
    queue.value = r
    onChange(r)
  }

  watch(
    () => ({
      roundSize: settings.roundSize,
      rounds: settings.rounds,
      pseconds: settings.pomodoro.minutes,
      bseconds: settings.breather.minutes,
      rseconds: settings.recess.minutes
    }),
    update
  )

  onMounted(update)

  return queue.value
}

const generateRounds = () => {
  const q = [] as Timer[]
  let roundCount = 0
  const roundSize = settings.roundSize

  while (++roundCount <= settings.rounds) {
    let sizeCount = 0
    while (++sizeCount <= roundSize) {
      q.push(
        {
          ...settings.pomodoro,
          seconds: settings.pomodoro.minutes * 60,
          index: q.length + 1
        },
        sizeCount === roundSize
          ? {
            ...settings.recess,
            seconds: settings.recess.minutes * 60,
            index: q.length + 2
          }
          : {
            ...settings.breather,
            seconds: settings.breather.minutes * 60,
            index: q.length + 2
          },
      )

    }
  }
  return q
}
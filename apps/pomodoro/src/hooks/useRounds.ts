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
  console.log('generateRounds');
  const q = [] as Timer[]
  let roundCount = 0
  const roundSize = parseInt(settings.roundSize as any)

  while (++roundCount <= settings.rounds) {
    let sizeCount = 0
    while (++sizeCount <= roundSize) {
      q.push(
        {
          ...settings.pomodoro,
          seconds: parseInt(settings.pomodoro.minutes as any) * 60,
          index: q.length + 1
        },
        sizeCount === roundSize
          ? {
            ...settings.recess,
            seconds: parseInt(settings.recess.minutes as any) * 60,
            index: q.length + 2
          }
          : {
            ...settings.breather,
            seconds: parseInt(settings.breather.minutes as any) * 60,
            index: q.length + 2
          },
      )

    }
  }
  return q
}
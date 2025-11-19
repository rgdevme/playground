import { useSettings } from "../context/settings"
import { Timer } from "../types"

export const useRounds = () => {
  const {
    roundSize,
    rounds,
    pomodoro,
    breather,
    recess,
  } = useSettings()

  let count = 0
  const total = roundSize * 2
  const queue: Timer[] = []

  while (++count <= rounds) {
    queue.push(
      { ...pomodoro, index: queue.length + 1 },
      count === total
        ? { ...recess, index: queue.length + 2 }
        : { ...breather, index: queue.length + 2 },
    )
  }

  return queue
}
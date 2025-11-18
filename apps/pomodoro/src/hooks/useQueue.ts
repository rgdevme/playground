import { computed, ref } from "vue"

type QueueEventProps<T> = {
  item: T,
  index: number,
  stepSize: number,
  queue: T[]
}

export const useQueue = <T = any>({
  items,
  onChange,
  onFinish,
}: {
  items: T[],
  onFinish?: (option: QueueEventProps<T>) => void
  onChange?: (options: QueueEventProps<T>) => void
}) => {
  const queue = ref(items)
  const index = ref(0)

  const status = computed(() => {
    console.log('statusing');

    const i = index.value
    const pending = queue.value.slice(0, i)
    const current = queue.value[i]
    const finished = queue.value.slice(i + 1)
    return { pending, current, finished }
  })

  const goTo = (i: number) => {
    const maxIndex = queue.value.length - 1
    const newIndex = Math.min(Math.max(0, i), maxIndex)
    const oldIndex = index.value
    if (newIndex === oldIndex) return
    index.value = newIndex

    const props: QueueEventProps<T> = {
      index: newIndex,
      stepSize: newIndex - oldIndex,
      item: queue.value[newIndex] as T,
      queue: queue.value as T[]
    }

    if (newIndex === maxIndex && onFinish) onFinish(props)
    else if (onChange) onChange(props)
  }
  const next = () => goTo(index.value + 1)
  const previous = () => goTo(index.value - 1)

  return ref({
    status,
    index,
    length: queue.value.length,
    next,
    previous,
    goTo
  })
}
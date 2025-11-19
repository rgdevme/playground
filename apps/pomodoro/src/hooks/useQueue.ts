import { computed, ref } from "vue"

type QueueEventProps<T> = {
  item: T,
  index: number,
  stepSize: number,
  queue: T[]
}

export const useQueue = <T = any>({
  onChange,
  onFinish,
  onEnqueue
}: {
  onEnqueue?: (queue: T[]) => void
  onFinish?: (option: QueueEventProps<T>) => void
  onChange?: (options: QueueEventProps<T>) => void
}) => {
  const queue = ref<T[]>([])
  const index = ref(0)

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
  const enqueue = (items: T[]) => {
    queue.value = items
    onEnqueue?.(items)
  }

  const methods = {
    goTo,
    next,
    previous,
    enqueue
  }

  const state = computed(() => {
    const i = index.value
    return {
      index: i,
      length: queue.value.length,
      pending: queue.value.slice(0, i),
      current: queue.value[i],
      finished: queue.value.slice(i + 1),
    }
  })

  return [state, methods] as [typeof state, typeof methods]
}
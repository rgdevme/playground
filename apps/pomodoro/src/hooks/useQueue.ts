import { computed, ref } from "vue"

export const useQueue = <T = any>({
  items,
  onChange
}: {
  items: T[]
  onChange?: (
    currentItem: T, index: number, previous: number, queue: T[]) => void
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
    const newIndex = Math.min(Math.max(0, i), queue.value.length - 1)
    const oldIndex = index.value
    if (newIndex === oldIndex) return
    index.value = newIndex
    onChange?.(queue.value[newIndex] as T, newIndex, oldIndex, queue.value as T[])
  }
  const next = () => goTo(index.value + 1)
  const previous = () => goTo(index.value - 1)

  return {
    status,
    index,
    length: queue.value.length,
    next,
    previous,
    goTo
  }
}
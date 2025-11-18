<script setup lang="ts">

const {
  disable,
  onClick
} = defineProps<{
  disable?: boolean
  onClick: () => void
}>()
</script>

<template>
  <button class="btn" :disable="disable" @click="onClick">
    <slot />
  </button>
</template>

<style scoped>
.btn {
  padding: 0.5rem;
  line-height: 1rem;
  aspect-ratio: 1;
  border-radius: 2rem;
  width: 2rem;
  height: 2rem;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 150ms ease-in-out;
  background: white;
  color: rgba(0, 0, 0, 0.45);
}

.btn:hover {
  color:
    white;
  background:
    hsl(168, 100%, 40%);
  box-shadow: 0 0.25rem 0.5rem 0 rgba(0, 0, 0, 0.1);
  transform: translateY(-10%) scale(1.1);
}
</style>

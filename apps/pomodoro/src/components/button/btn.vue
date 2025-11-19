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
  <button :class="`btn neumorphic flat sm ${disable ? 'disabled' : 'animated'}`" :disable="disable" @click="onClick">
    <slot />
  </button>
</template>

<style scoped lang="scss">
.btn {
  padding: 0.5rem;
  line-height: 1rem;
  aspect-ratio: 1;
  width: 2rem;
  height: 2rem;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 150ms ease-in-out;
  color: rgba(0, 0, 0, 0.35);
  cursor: pointer;

  &.disabled {
    cursor: not-allowed;
    color: rgba(0, 0, 0, 0.15);
    box-shadow: none;
  }

  &:not(.disabled):hover {
    color: rgba(0, 0, 0, 0.85);
  }
}
</style>

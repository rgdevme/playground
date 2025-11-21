<script setup lang="ts">

const model = defineModel('value', { required: true })
const {
  label = 'Missing label',
  type = 'text'
} = defineProps<{
  label: string,
  type: HTMLInputElement['type']
}>()

</script>

<template>
  <div class="container">
    <label class="label">{{ label }}</label>
    <div class="wrapper neumorphic flat inside sm">
      <slot v-if="$slots.prefix" name="prefix" class="prefix" />
      <input :type="type" v-model="model" />
      <slot v-if="$slots.controls" name="controls" class="controls" />
      <slot v-if="$slots.suffix" name="suffix" class="suffix" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  align-items: center;
  gap: 1em;
  width: 100%;
  font-size: 14px;
  color: hsla(0, 0%, 35%, 1);

  &:hover {
    color: black
  }
}

.wrapper {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  align-items: center;
  padding: 0 0.5rem;
  transition: background-color 150ms ease-in-out;
  color: hsla(0, 0%, 35%, 1);
  flex: 1;

  &:focus-within {
    background-color: hsla(0, 0%, 85%, 0.15);
    color: black
  }
}

.label {
  transition: color 150ms ease-in-out;
  color: inherit;
}

input {
  font-family: var(--font-mono);
  line-height: 1.5;
  background: transparent;
  padding: 0.5em;
  // padding-bottom: 0.5em;
  // padding-left: calc(var(--prefix) + 1em);
  // padding-right: calc(var(--suffix) + 1em);
  outline: none;
  width: 100%;
  color: inherit;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  &[type=number] {
    -moz-appearance: textfield;
  }

}
</style>

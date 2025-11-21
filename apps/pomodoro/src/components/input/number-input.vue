<script setup lang="ts">
import { IconCaretUpFilled, IconCaretDownFilled } from '@tabler/icons-vue'
import InputBase from './input-base.vue';

const model = defineModel('value', { required: true })
const {
  label = 'Missing label',
  suffix,
  prefix,
  arrows = true
} = defineProps<{
  label: string,
  suffix?: string,
  prefix?: string,
  arrows?: boolean
}>()

const vars = [
  ['--suffix', !suffix ? '0px' : '12px'],
  ['--prefix', !prefix ? '0px' : '12px'],
  ['--arrows', !arrows ? '0px' : '12px'],
].map(x => x.join(': ')).join('; ')

</script>

<template>
  <InputBase type="number" :label="label" v-model:value="model">
    <template #prefix>
      <span class="prefix" v-if="!!prefix">{{ prefix }}</span>
    </template>
    <template #controls>
      <div class="controls">
        <div>
          <IconCaretUpFilled size="12" />
        </div>
        <div>
          <IconCaretDownFilled size="12" />
        </div>
      </div>
    </template>
    <template #suffix>
      <span class="suffix" v-if="!!suffix">{{ suffix }}</span>
    </template>
  </InputBase>
</template>

<style scoped lang="scss">
.suffix,
.prefix {
  width: calc(1.5em + 0.5em);
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1;
}

.controls {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  height: 100%;
  width: calc((1.5em + 0.5em));
  transition: opacity 150ms ease-in-out;
  opacity: 0;
  pointer-events: none;

  >* {
    flex: 1;
    line-height: 1;
    justify-content: center;
    align-items: center;
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc((1.5em + 0.5em));
  }

  svg {
    color: rgba(0, 0, 0, 0.5);
    fill: currentColor;
  }

  .container:hover & {
    cursor: pointer;
    opacity: 1;
    pointer-events: initial;
  }
}
</style>

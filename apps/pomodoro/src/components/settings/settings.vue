<script setup lang="ts">
import { computed, useTemplateRef, watch } from 'vue';
import { settings } from '../../context/settings';
import NumberInput from '../input/number-input.vue';
import SwitchInput from '../input/switch-input.vue';
import TextInput from '../input/text-input.vue';
import { IconX } from '@tabler/icons-vue';

const hidden = computed(() => {
  console.log('tab: ', settings.tab, settings.tab !== 'settings', settings.tab !== 'settings' ? 'hidden' : '');
  return (settings.tab !== 'settings' ? 'hidden' : '')
})

const closeSettings = () => settings.tab = 'timer'

</script>

<template>
  <div :class="'backdrop ' + hidden" @click="closeSettings" ></div>
  <div id="settings" :class="'neumorphic sm flat settings ' + hidden">
    <div class="top">
      <span class="title">Settings</span>
      <div class="close" @click="closeSettings">
        <IconX size="16px" />
      </div>
    </div>
    <NumberInput label="Rounds" v-model:value="settings.rounds" />
    <NumberInput label="Pomodoros per round" v-model:value="settings.roundSize" />
    <SwitchInput label="Auto-start on open" v-model:value="settings.startOnOpen" />
    <SwitchInput label="Count down" v-model:value="settings.countdown" />
    <TextInput label="Label" v-model:value="settings.pomodoro.label" />
    <NumberInput label="Minutes" v-model:value="settings.pomodoro.minutes" />
    <TextInput label="Label" v-model:value="settings.breather.label" />
    <NumberInput label="Minutes" v-model:value="settings.breather.minutes" />
    <TextInput label="Label" v-model:value="settings.recess.label" />
    <NumberInput label="Minutes" v-model:value="settings.recess.minutes" />
    <input type="range" v-model="settings.volume" />
    <SwitchInput label="Muted" v-model:value="settings.muted" />
    <TextInput label="Mode" v-model:value="settings.mode" />
    <TextInput label="Color" v-model:value="settings.color" />
  </div>
</template>

<style lang="scss">
.backdrop {
  position: absolute;
  z-index: 3;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: hsla(0, 0%, 100%, 0.35);
  transition: opacity 150ms ease-in-out;
}

.settings {
  position: absolute;
  z-index: 5;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  // background-color: hsla(0, 0%, 95%, 0.5);
  border-radius: 1.5rem;
  max-height: calc(100vh - 2rem);
  max-width: 300px;
  width: calc(100vw - 2rem);
  opacity: 1;
  pointer-events: initial;
  transition: opacity 150ms ease-in-out;
  overflow-y: auto;

}

.title {
  font-size: 1rem;
}

.close {
  cursor: pointer;
  color: hsl(0, 0%, 70%);
  fill: currentColor;
  transition: all 150ms ease-in-out;

  &:hover {
    color: indianred;
  }
}

.hidden {
  opacity: 0;
  pointer-events: none;
}

.top {
  display: flex;
  flex: 1;

  span {
    flex: 1;
  }
}

.timer {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;

  >* {
    flex: 1 1 0%;
  }
}

.rounds,
.volume,
.other {
  display: flex;
  flex-direction: row;
  gap: 1rem;

}

.label {
  /* width: 10rem; */
}
</style>

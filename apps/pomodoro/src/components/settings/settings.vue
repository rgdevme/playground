<script setup lang="ts">
import { settings } from '../../context/settings';
</script>

<template>
  <div class="settings">
    <div class="rounds">
      <input type="number" v-model="settings.rounds" />
      <input type="number" v-model="settings.roundSize" />
      <input type="checkbox" v-model="settings.startOnOpen" />
      <input type="checkbox" v-model="settings.countdown" />
    </div>
    <div class="timer">
      <input type="text" v-model="settings.pomodoro.label" />
      <input type="number" v-model="settings.pomodoro.minutes" />
    </div>
    <div class="timer">
      <input type="text" v-model="settings.breather.label" />
      <input type="number" v-model="settings.breather.minutes" />
    </div>
    <div class="timer">
      <input type="text" v-model="settings.recess.label" />
      <input type="number" v-model="settings.recess.minutes" />
    </div>
    <div class="volume">
      <input type="range" v-model="settings.volume" />
      <input type="checkbox" v-model="settings.muted" />
    </div>
    <div class="other">
      <input type="text" v-model="settings.mode" />
      <input type="text" v-model="settings.color" />
    </div>
  </div>
</template>

<style scoped></style>

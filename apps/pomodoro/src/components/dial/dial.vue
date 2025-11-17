<script setup lang="ts">
import { gsap } from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { computed, onMounted, ref, watch } from 'vue';
import { Timer } from '../../types';

gsap.registerPlugin(DrawSVGPlugin);

const { timer, status, color } = defineProps<{
  timer: Timer,
  status: 'play' | 'pause' | 'stop'
  color: string
}>()

const radius = 75
const strokeWidth = ref(15)
const viewBox = computed(() => {
  return (radius * 2) + strokeWidth.value
})
const tl = ref(gsap.timeline())

const reset = () => {
  console.log('reseting');
  tl.value.kill()
  gsap.set('#dial #tracker', {
    drawSVG: '0%',
    strokeLinecap: 'round'
  })
  tl.value = gsap
    .timeline({ paused: status !== 'play' })
    .to('#dial #tracker', {
      drawSVG: '100%',
      duration: timer.seconds,
      ease: "power1.inOut",
      onComplete: () => console.log('finished')
    })
}

const handleState = () => {
  console.log('handling state', status);
  switch (status) {
    case 'play':
      tl.value.play()
      break;

    case 'pause':
      tl.value.pause()
      break;

    case 'stop':
      tl.value.pause(0)
      break;

    default:
      break;
  }
}

watch(() => status, handleState)
watch(() => timer, reset)
onMounted(reset)

</script>

<template>
  <svg id="dial" :width="viewBox" :height="viewBox" :viewBox="`0 0 ${viewBox} ${viewBox}`" fill="none">
    <circle id="bg" :cx="viewBox / 2" :cy="viewBox / 2" :r="radius" stroke="lightgray" :stroke-width="strokeWidth" />
    <circle id="tracker" :cx="viewBox / 2" :cy="viewBox / 2" :r="radius" :stroke="color" :stroke-width="strokeWidth" />
  </svg>
</template>

<style scoped></style>

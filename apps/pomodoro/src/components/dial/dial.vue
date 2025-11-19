<script setup lang="ts">
import { gsap } from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { computed, onMounted, ref, useTemplateRef, watch } from 'vue';
import { Timer } from '../../types';

gsap.registerPlugin(DrawSVGPlugin);

const { timer, status, color } = defineProps<{
  timer: Timer,
  status: 'play' | 'pause' | 'stop'
  color: string
}>()

const wrapper = useTemplateRef('dial')
const originalRadius = ref(150)
const radius = ref(150)
const strokeWidth = ref(15)
const viewBox = computed(() => {
  return (radius.value * 2) + strokeWidth.value
})
const tl = ref(gsap.timeline())

const updateRadius = () => {
  if (!wrapper.value) return
  const { width } = wrapper.value.getBoundingClientRect()
  const viewportRadius = (width / 2) - strokeWidth.value
  const newRadius = Math.min(originalRadius.value, viewportRadius)
  radius.value = newRadius
}

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
onMounted(() => {
  reset()
  window.addEventListener("resize", updateRadius);

})

</script>

<template>
  <div ref="dial" class="dial" :style="`--inner-size: ${viewBox}px; --outer-size: ${radius * 2 - strokeWidth}px; --offset: ${strokeWidth}px`">
    <svg id="dial" class="neumorphic sm flat" :width="viewBox" :height="viewBox" :viewBox="`0 0 ${viewBox} ${viewBox}`"
      fill="none">
      <circle id="bg" :cx="viewBox / 2" :cy="viewBox / 2" :r="radius" :stroke-width="strokeWidth" />
      <circle id="tracker" :cx="viewBox / 2" :cy="viewBox / 2" :r="radius" :stroke="color"
        :stroke-width="strokeWidth" />
    </svg>
    <div class="top neumorphic sm concave" />
  </div>
</template>

<style scoped lang="scss">
.dial {
  width: 100%;
  height: var(--inner-size);
  margin: 0 auto;
  position: relative;

  .top {
    box-sizing: border-box;
    position: absolute;
    width: var(--outer-size);
    height: var(--outer-size);
    top: 0;
    left: 50%;
    transform: translate(-50%, var(--offset));
    aspect-ratio: 1;
    border-radius: 100%;
  }
}

svg {
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  border-radius: 100%;
  margin: 0 auto;
  width: min-content;
  position: absolute;

  #bg {
    stroke: rgba(0, 0, 0, 0.025);
  }
}
</style>

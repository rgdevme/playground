<script setup lang="ts">

const model = defineModel('value', { required: true })
const {
  label = 'Missing label'
} = defineProps<{
  label: string
}>()

</script>

<template>
  <div class="container">
    <label class="label">{{ label }}</label>
    <div class="wrapper neumorphic flat inside sm" @click="() => model = !model">
      <div class="indicator" :data-checked="model">
        <div class="button convex sm neumorphic"></div>
      </div>
      <input type="checkbox" v-model="model" hidden />
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
  font-size: 14px;
  color: hsla(0, 0%, 35%, 1);

  &:hover {
    color: black
  }
}

.indicator {
  width: 2rem;
  height: 2rem;
  padding: 0.35rem;
  position: relative;
  left: 1rem;
  transition: left 150ms ease-in-out;

  &[data-checked=false] {
    left: 0rem;

    .button {
      --bg: hsla(0, 0%, 45%, 0.15);
    }
  }

  .button {
    font-size: 3px;
    width: 100%;
    height: 100%;
    transition: background-color 150ms ease-in-out;
  }
}

.wrapper {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  align-items: center;
  transition: background-color 150ms ease-in-out;
  background-color: hsla(0, 0%, 90%, 1);
  flex: 1;
  width: 3rem;
  max-width: 3rem;
  height: 2rem;
}

.label {
  transition: color 150ms ease-in-out;
  color: inherit;
}
</style>

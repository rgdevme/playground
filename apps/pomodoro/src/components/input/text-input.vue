<script setup lang="ts">
import InputBase from './input-base.vue';

const model = defineModel('value', { required: true })
const { label } = defineProps<{
  label: string,
}>()

</script>

<template>
  <InputBase type="text" :label="label" v-model:value="model"></InputBase>
</template>

<style scoped></style>

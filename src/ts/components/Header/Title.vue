<template>
  <div
    class="text-h4 pa-4"
    :style="`height: ${height}px; opacity: 0.8`"
  >
    {{ label ?? 'The Awesome Weather App' }}
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    label?: string
    height: number
  }>()
</script>

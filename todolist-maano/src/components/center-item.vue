<template>
  <div class="center-container">
    <span class="center-text">{{ msg }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  msg: string
}>()    
</script>

<style scoped>
.center-container {
    display: flex;
    justify-content: center;
    align-items: center;
}
.center-text {
  font-size: 2rem;
  font-weight: bold;
}
</style>

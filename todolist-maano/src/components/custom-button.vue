<template>
  <button class="custom-btn">
    <slot>Click Me</slot>
  </button>
</template>

<script setup lang="ts">
// No script logic needed
</script>

<style scoped>
.custom-btn {
  padding: 0.5rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  background-color: #1976d2;
  color: #fff;
  cursor: pointer;
  transition: background 0.2s;
}
.custom-btn:hover {
  background-color: #1565c0;
}
</style>

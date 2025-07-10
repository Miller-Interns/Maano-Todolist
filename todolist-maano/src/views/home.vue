<script setup lang="ts">
import centerItem from '@/components/center-item.vue';
// @ts-ignore
import customButton from '@/components/custom-button.vue';
const savedName = localStorage.getItem('Name')
const savedDate = localStorage.getItem('Date')

function reloadPage() {
  window.location.reload();
}
</script>
<template>
  <main class="center-container">
    <center-item :msg = 'savedName || "No Name"'/>
    <center-item :msg='savedDate || "No Date"'/>
    <custom-button @click="reloadPage"/>
  </main>
</template>

<style>
.center-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
}
</style>
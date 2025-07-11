<script setup lang="ts">
import centerItem from '@/components/center-item.vue';
// @ts-ignore
import customButton from '@/components/custom-button.vue';
import { onMounted } from 'vue';
const savedName = localStorage.getItem('name')
const savedDate = localStorage.getItem('date')

function setName() {
  const name: string | null= prompt('Enter your name:');
  const date: string | null= prompt('What is the date for today?\n(I am from mars =))');
  if (name && date) {
    localStorage.setItem('name', name);
    localStorage.setItem('date', date);
    window.location.reload();
  }
}

function removeRecord() {
  localStorage.removeItem('name');
  localStorage.removeItem('date');
  window.location.reload();
}

onMounted(() => {
  if (!savedName) {
    setName();
  }
});
</script>
<template>
  <main class="center-container">
    <center-item :msg = 'savedName || "No Name"'/>
    <center-item :msg='savedDate || "No Date"'/>
    <customButton class="todo-button"><RouterLink to="/todolist">To do list</RouterLink></customButton>
    <customButton @click="removeRecord" class="surrender-button">I surrender</customButton>
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

.todo-button {
  background-color: #ffffff;
}

.surrender-button {
  background-color: #ff0000;
  color: #ffffff;
  margin-top: 1rem;
}

.surrender-button:hover {
  background-color: #cc0000;
}
</style>
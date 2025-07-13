<script setup lang="ts">
import { storeToRefs } from 'pinia';
import centerItem from '@/components/center-item.vue';
import { useUserStore } from '@/stores/userStore';
import { onMounted } from 'vue';

//connection to store
const userDataStore = useUserStore();

//the data
const { userName, userDate } = storeToRefs(userDataStore);

//get teh functions
const {
  loadUserFromStorage,
  removeRecord,
  setName,
} = userDataStore;

loadUserFromStorage();

onMounted(() => {
  if (userName.value == '') {
    setName();
  }
});
</script>
<template>
  <main class="center-container">
    <div class="center-content">
      <center-item :msg='userName || "No Name"' />
      <center-item :msg='userDate || "No Date"' />
      <RouterLink to="/todolist">
        <button class="todo-button">To do list</button>
      </RouterLink>
      <button @click="removeRecord" class="surrender-button">I surrender</button>
    </div>
  </main>
</template>

<style>
.center-container {
  display: fixed;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.center-content {
  border: #000000 solid 10px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #999;
  font-weight: bold;
  text-shadow: 5px 5px 10px rgba(0, 0, 0, 1);
  color: #ffffff;
}

.todo-button {
  background-color: #aa6f02;
  margin-top: 1rem;
  padding: 10px 20px;
  font-size: large;
  font-weight: bold;
  text-shadow: 5px 5px 10px rgba(0, 0, 0, 1);
  color: #ffffff;
}

.todo-button:hover {
  background-color: #8a5c02;
}

.surrender-button {
  padding: 10px 20px;
  font-size: large;
  background-color: #ff0000;
  margin-top: 1rem;
  color: #ffffff;
  font-weight: bold;
  text-shadow: 5px 5px 10px rgba(0, 0, 0, 1);
}

.surrender-button:hover {
  background-color: #cc0000;
}
</style>
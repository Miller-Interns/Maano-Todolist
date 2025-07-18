<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useTodoStore } from '../stores/todoStore.ts';
import { useUserStore } from '@/stores/userStore.ts';
import category from '@/components/category.vue';

// Get a connection to our central store
const todoStore = useTodoStore();
const userDataStore = useUserStore();

// Get the data (state) out of the store.
// 'storeToRefs' makes sure it stays reactive (magical)!
const { newCategoryName } = storeToRefs(todoStore);
const { userName } = storeToRefs(userDataStore);

// Get the functions 
const {
  addCategory,
  loadTodosFromStorage,
} = todoStore;

const {
  loadUserFromStorage,
  removeRecord
} = userDataStore;

// Load any saved data from localStorage
loadUserFromStorage();
loadTodosFromStorage();
</script>

<template>
  <div class="app-container">
    <div class="top-text">
      <h1>!! DO THIS LIST !!</h1>
      <h3>{{ userName }}</h3>
    </div>
    <button @click="removeRecord" class="surrender-button">I surrender</button>
    <!-- add new category -->
    <div class="category-creator">
      <input v-model="newCategoryName" @keyup.enter="addCategory" placeholder="Name for a new page" />
      <button @click="addCategory">Add New Category</button>
    </div>
    <!-- Show all our PAGES (Categories) -->
    <category />
  </div>
</template>

<style scoped>
.app-container {
  margin: 20px auto;
  padding: 20px;
  font-family: sans-serif;
  font-weight: bold;
  background-color: #999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: #000000 solid 10px;
}

.top-text {
  text-align: center;
  margin-bottom: 20px;
  border: 2px solid #000000;
  background-color: #ff1d1d;
  color: #ffffff;
  border-radius: 10px;
  padding: 15px;
  height: 100%;
  font-weight: bold;
  text-shadow: 5px 5px 10px rgba(0, 0, 0, 1);
}

h1 {
  text-align: center;
  color: #ffffff;
  font-family: sans-serif;
  font-weight: bold;
}

input {
  padding: 10px;
  border: 5px solid #000000;
  border-radius: 8px;
  font-size: 15px;
  width: calc(100% - 120px);
}

.delete-category {
  background-color: #df0606;
  margin-bottom: 10px;
}

button {
  background-color: #29aa02;
  padding: 10px 20px;
  font-size: large;
  font-weight: bold;
  text-shadow: 5px 5px 10px rgba(0, 0, 0, 1);
  color: #ffffff;
}

.category-creator {
  margin-bottom: 20px;
  display: flex;
}

.surrender-button {
  background-color: #ff0000;
  color: #ffffff;
  font-weight: bold;
  text-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
  margin-bottom: 30px;
}

.surrender-button:hover {
  background-color: #cc0000;
}
</style>
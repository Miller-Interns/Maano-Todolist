<!-- src/components/TodoList.vue -->
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useTodoStore } from '../stores/todoStore.ts';
import { useUserStore } from '@/stores/userStore.ts';
import draggable from 'vuedraggable';

// Get a connection to our central store
const todoStore = useTodoStore();
const userDataStore = useUserStore();

// Get the data (state) out of the store.
// 'storeToRefs' makes sure it stays reactive (magical)!
const { categories, newCategoryName} = storeToRefs(todoStore);
const {userName} = storeToRefs(userDataStore);

// Get the functions (actions) out of the store.
const {
    addCategory,
    addTodo,
    deleteTodo,
    deleteCategory,
    toggleEdit,
    saveEdit,
    loadTodosFromStorage,
} = todoStore;

const {
  loadUserFromStorage,
  removeRecord
} = userDataStore;

// Load any saved data from localStorage when the component is ready
loadUserFromStorage();
loadTodosFromStorage();
</script>

<!-- src/components/TodoList.vue -->
<template>
  <div class="app-container">
    <div class="top-text">
      <h1>!! DO THIS LIST !!</h1>
      <h3>{{ userName }}</h3>
    </div>
    <RouterLink to="/">
      <button @click="removeRecord" class="surrender-button">I surrender</button>
    </RouterLink>
    <!-- Part 1: Form to create a new PAGE (Category) -->
    <div class="category-creator">
      <input v-model="newCategoryName" @keyup.enter="addCategory" placeholder="Name for a new page" />
      <button @click="addCategory">Add New Page</button>
    </div>

    <!-- Part 2: Show all our PAGES (Categories) -->
    <div v-for="category in categories" :key="category.id" class="category">
      <h2>{{ category.name }}</h2>
      <button class="delete-category" @click="deleteCategory(category.id)">Delete</button>
      <!-- Part 3: Form to create a new STICKER (To-Do) on THIS page -->
      <div class="todo-creator">
        <input v-model="category.newTodoText" @keyup.enter="addTodo(category)" placeholder="Add a new sticker..." />
        <button @click="addTodo(category)">Add Sticker</button>
      </div>

      <!-- Part 4: Show all the STICKERS (To-Dos) on THIS page -->
      <draggable v-model="category.todos" item-key="id" tag="ul" class="todo-list">
        <template #item="{ element: todo }">
          <li class="todo-item draggable-item">
            <!-- The checkbox to mark it done (like a gold star!) -->
            <input type="checkbox" v-model="todo.isDone" />

            <!-- The sticker's text. It can change if we are editing. -->
            <span v-if="!todo.isEditing" :class="{ done: todo.isDone }">
              {{ todo.text }}
            </span>
            <input v-else v-model="todo.text" @keyup.enter="saveEdit(todo)" class="edit-input" />

            <!-- The buttons to edit or delete the sticker -->
            <div class="todo-actions">
              <button @click="toggleEdit(todo)">{{ todo.isEditing ? 'Save' : 'Edit' }}</button>
              <button class="danger" @click="deleteTodo(category, todo.id)">Delete</button>
            </div>
          </li>
        </template>
      </draggable>
    </div>
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

button.danger {
  background-color: #df0606;
}

.category-creator,
.todo-creator {
  margin-bottom: 20px;
  display: flex;
}

.category {
  background-color: #b17b08;
  border: 5px solid #000000;
  border-radius: 10px;
  padding: 15px;
  margin-top: 20px;
}

.category h2 {
  margin-top: 0;
  color: #ffffff;
  text-shadow: 5px 5px 10px rgba(0, 0, 0, 1);
  font-size: 30px;
}

ul {
  list-style-type: none;
  padding: 0;
}

.todo-item {
  display: flex;
  align-items: center;
  padding: 10px;
  background: white;
  margin-top: 8px;
  border-radius: 8px;
  border: 5px solid #000000;
  font-size: 25px;
}

.todo-item span {
  flex-grow: 1;
  margin: 0 10px;
  color: #000000;
}

.todo-item span.done {
  text-decoration: line-through;
  color: #078111;
}

.edit-input {
  flex-grow: 1;
  margin: 0 10px;
  font-size: medium;
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

.draggable-item {
  cursor: grab;
}
</style>
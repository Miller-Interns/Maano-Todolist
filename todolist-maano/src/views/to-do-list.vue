<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

// --- Defining what our stickers and pages look like ---
type Todo = {
  id: number;
  text: string;
  isDone: boolean;
  isEditing: boolean; // To know if we are editing it
}

type Category = {
  id: number;
  name: string;
  todos: Todo[];
  newTodoText: string; // A temporary place to write a new sticker's text
}

// --- The Magic Memory Box for our Sticker Book ---
// It holds all our pages (categories).
const categories = ref<Category[]>([]);
const newCategoryName = ref(''); // A temporary place to write a new page's name
const userName = ref(''); // Store the user's name

// --- The Functions that do the Magic ---

// Add a new, empty page to our book
function addCategory() {
  if (newCategoryName.value.trim() === '') return; // Don't add blank pages
  if (categories.value.find((category: Category) => category.name === newCategoryName.value)) {
    alert('Category already exists!');
    return;
  }
  categories.value.push({
    id: Date.now(), // A unique number so we don't mix up pages
    name: newCategoryName.value,
    todos: [],
    newTodoText: '',
  });
  newCategoryName.value = ''; // Clear the input box
}

// Add a new sticker to a specific page
function addTodo(category: Category) {
  if (category.newTodoText.trim() === '') return; // Don't add blank stickers
  if (category.todos.find((todo: Todo) => todo.text === category.newTodoText)) {
    alert('Todo already exists in this category!');
    return;
  }
  category.todos.push({
    id: Date.now(), // A unique number for the sticker
    text: category.newTodoText,
    isDone: false, // It's not done when we first make it
    isEditing: false, // We are not editing it right away
  });
  category.newTodoText = ''; // Clear the input box for that page
}

function removeRecord() {
  localStorage.removeItem('name');
  localStorage.removeItem('date');
  localStorage.removeItem('todo-app-data');
  window.location.reload();
}

// Peel a sticker off a page
function deleteTodo(category: Category, todoId: number) {
  category.todos = category.todos.filter(todo => todo.id !== todoId);
}

function deleteCategory(categoryId: number) {
  categories.value = categories.value.filter(category => category.id !== categoryId);
}

// Let's use our magic eraser on a sticker
function toggleEdit(todo: Todo) {
  todo.isEditing = !todo.isEditing;
}

// Save the changes after using the magic eraser
function saveEdit(todo: Todo) {
  todo.isEditing = false;
}

// --- Make our book remember everything even if we close it! ---
// This uses the browser's "magic storage drawer" (localStorage).

onMounted(() => {
  const savedCategories = localStorage.getItem('todo-app-data');
  if (savedCategories) {
    categories.value = JSON.parse(savedCategories);
  }
  const savedUserName = localStorage.getItem('name');
  if (savedUserName) {
    userName.value = savedUserName;
  }
});

// Anytime we change anything in our book, save it to the magic drawer
watch(categories, (newCategories) => {
  localStorage.setItem('todo-app-data', JSON.stringify(newCategories));
}, { deep: true }); // "deep: true" means "watch for changes even deep inside the stickers"

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
      <input
        v-model="newCategoryName"
        @keyup.enter="addCategory"
        placeholder="Name for a new page"
      />
      <button @click="addCategory">Add New Page</button>
    </div>

    <!-- Part 2: Show all our PAGES (Categories) -->
    <div v-for="category in categories" :key="category.id" class="category">
      <h2>{{ category.name }}</h2>
      <button class="delete-category" @click="deleteCategory(category.id)">Delete</button>
      <!-- Part 3: Form to create a new STICKER (To-Do) on THIS page -->
      <div class="todo-creator">
        <input
          v-model="category.newTodoText"
          @keyup.enter="addTodo(category)"
          placeholder="Add a new sticker..."
        />
        <button @click="addTodo(category)">Add Sticker</button>
      </div>

      <!-- Part 4: Show all the STICKERS (To-Dos) on THIS page -->
      <ul>
        <li v-for="todo in category.todos" :key="todo.id" class="todo-item">
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
      </ul>
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
.delete-category{
  background-color: #df0606;
  margin-left: 230px;
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
.category-creator, .todo-creator {
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
}
.todo-item span.done {
  text-decoration: line-through;
  color: #999;
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
</style>
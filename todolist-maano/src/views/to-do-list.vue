<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import draggable from 'vue-draggable-next';

// --- Defining what our stickers and pages look like ---
type Todo = {
  id: number;
  text: string;
  isDone: boolean;
  isEditing: boolean; // To know if we are editing it
}

type Category ={
  id: number;
  name: string;
  todos: Todo[];
  newTodoText: string; // A temporary place to write a new sticker's text
}

// --- The Magic Memory Box for our Sticker Book ---
// It holds all our pages (categories).
const categories = ref<Category[]>([]);
const newCategoryName = ref(''); // A temporary place to write a new page's name

// --- The Functions that do the Magic ---

// Add a new, empty page to our book
function addCategory() {
  if (newCategoryName.value.trim() === '') return; // Don't add blank pages
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
  category.todos.push({
    id: Date.now(), // A unique number for the sticker
    text: category.newTodoText,
    isDone: false, // It's not done when we first make it
    isEditing: false, // We are not editing it right away
  });
  category.newTodoText = ''; // Clear the input box for that page
}

// Peel a sticker off a page
function deleteTodo(category: Category, todoId: number) {
  category.todos = category.todos.filter(todo => todo.id !== todoId);
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

// When the book is first opened, try to load our saved pages
onMounted(() => {
  const savedCategories = localStorage.getItem('todo-app-data');
  if (savedCategories) {
    categories.value = JSON.parse(savedCategories);
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
    <h1>My Magic To-Do Sticker Book</h1>

    <!-- (No changes to the category creator) -->
    <div class="category-creator">
      <input
        v-model="newCategoryName"
        @keyup.enter="addCategory"
        placeholder="Name for a new page (e.g., School)"
      />
      <button @click="addCategory">Add New Page</button>
    </div>

    <div v-for="category in categories" :key="category.id" class="category">
      <h2>{{ category.name }}</h2>
      
      <!-- (No changes to the todo creator) -->
      <div class="todo-creator">
        <input
          v-model="category.newTodoText"
          @keyup.enter="addTodo(category)"
          placeholder="Add a new sticker..."
        />
        <button @click="addTodo(category)">Add Sticker</button>
      </div>

      <!-- 
        CHANGE HERE: We are replacing the <ul> tag with our magic <draggable> component.
        This makes everything inside it slippery and movable!
      -->
      <draggable 
        v-model="category.todos" 
        item-key="id" 
        tag="ul"
        class="todo-list"
        handle=".handle"
      >
        <template #item="{ element: todo }">
          <li class="todo-item">
            <!-- This is our little handle to grab and drag the sticker -->
            <span class="handle">⠿</span>

            <input type="checkbox" v-model="todo.isDone" />
            
            <span v-if="!todo.isEditing" :class="{ done: todo.isDone }">
              {{ todo.text }}
            </span>
            <input v-else v-model="todo.text" @keyup.enter="saveEdit(todo)" class="edit-input" />

            <div class="todo-actions">
              <button @click="toggleEdit(todo)">{{ todo.isEditing ? 'Save' : 'Edit' }}</button>
              <button class="danger" @click="deleteTodo(category, todo.id)">Delete</button>
            </div>
          </li>
        </template>
      </draggable>
      <!-- The old <ul> is gone, replaced by the magic above -->
      
    </div>
  </div>
</template>

<style scoped>
/* (The old styles are mostly the same, with a few additions) */
.app-container {
  max-width: 700px;
  margin: 20px auto;
  padding: 20px;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  background-color: #fffbeB;
  border: 4px dashed #f9a825;
  border-radius: 15px;
}
h1 {
  text-align: center;
  color: #c53929;
}
input {
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 8px;
  width: calc(100% - 120px);
}
button {
  padding: 10px 15px;
  border: none;
  background-color: #4caf50;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  margin-left: 10px;
  font-weight: bold;
}
button.danger {
  background-color: #f44336;
}
.category-creator, .todo-creator {
  margin-bottom: 20px;
  display: flex;
}
.category {
  background-color: #e3f2fd;
  border: 2px solid #90caf9;
  border-radius: 10px;
  padding: 15px;
  margin-top: 20px;
}
.category h2 {
  margin-top: 0;
  color: #1e88e5;
}
/* CHANGE HERE: Rename 'ul' to '.todo-list' to match our draggable component */
.todo-list {
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
}
/* CHANGE HERE: Add style for our new drag handle */
.handle {
  font-size: 20px;
  color: #ccc;
  cursor: grab; /* Shows a little hand when you hover over it */
  margin-right: 10px;
}
</style>


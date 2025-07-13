import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import type { Category, Todo } from '../types';

// 'defineStore' creates our store.
export const useTodoStore = defineStore('todos', () => {

  // the state
  const categories = ref<Category[]>([]);
  const newCategoryName = ref('');

  function addCategory() {
    if (newCategoryName.value.trim() === '') {
      alert('Type in something');
      return;
    }
    if (categories.value.find((category) => category.name === newCategoryName.value)) {
      alert('Category already exists!');
      return;
    }
    categories.value.push({
      id: Date.now(),
      name: newCategoryName.value,
      todos: [],
      newTodoText: '',
    });
    newCategoryName.value = '';
  }

  function addTodo(category: Category) {
    if (category.newTodoText.trim() === '') {
      alert("Type in something");
      return;
    }
    if (category.todos.find((todos) => todos.text === category.newTodoText)){
      alert("Sticker already exist!");
      return;
    }
    category.todos.push({
      id: Date.now(),
      text: category.newTodoText,
      isDone: false,
      isEditing: false,
    });
    category.newTodoText = '';
  }

  function deleteTodo(category: Category, todoId: number) {
    category.todos = category.todos.filter(todo => todo.id !== todoId);
  }

  function deleteCategory(categoryId: number) {
    categories.value = categories.value.filter(category => category.id !== categoryId);
  }

  function toggleEdit(todo: Todo) {
    todo.isEditing = !todo.isEditing;
  }

  function saveEdit(todo: Todo) {
    todo.isEditing = false;
  }

  function loadTodosFromStorage() {
    const savedCategories = localStorage.getItem('todo-app-data');
    if (savedCategories) {
      categories.value = JSON.parse(savedCategories);
    }
  }
  // Watch for changes and save them to the "magic sticker drawer"
  watch(categories, (newCategories) => {
    localStorage.setItem('todo-app-data', JSON.stringify(newCategories));
  }, { deep: true });
  
  // Return everything so our components can use them
  return {
    categories,
    newCategoryName,
    addCategory,
    addTodo,
    deleteTodo,
    deleteCategory,
    toggleEdit,
    saveEdit,
    loadTodosFromStorage,
  };
});
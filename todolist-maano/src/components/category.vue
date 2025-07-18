<script setup lang="ts">
import { useTodoStore } from '../stores/todoStore.ts';
import draggable from 'vuedraggable';
import { storeToRefs } from 'pinia';

const todoStore = useTodoStore();

const { categories } = storeToRefs(todoStore);

const {
    addTodo,
    deleteTodo,
    deleteCategory,
    toggleEdit,
    saveEdit
} = todoStore;
</script>

<template>
    <div v-for="category in categories" :key="category.id" class="category">
        <h2>{{ category.name }}</h2>
        <button class="delete-category" @click="deleteCategory(category.id)">Delete</button>
        <!-- add a sticker (todo) -->
        <div class="todo-creator">
            <input v-model="category.newTodoText" @keyup.enter="addTodo(category)" placeholder="Add a new sticker..." />
            <button @click="addTodo(category)">Add Sticker</button>
        </div>

        <!-- whole sticker -->
        <draggable v-model="category.todos" item-key="id" tag="ul" class="todo-list">
            <template #item="{ element: todo }">
                <li class="todo-item draggable-item">
                    <!-- checkbox -->
                    <input type="checkbox" v-model="todo.isDone" />

                    <!-- editing the sticker -->
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
</template>

<style scoped>
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

.draggable-item {
    cursor: grab;
}
</style>
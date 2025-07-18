import { defineStore } from 'pinia';
import { ref } from 'vue';

// 'defineStore' creates our store.
export const useUserStore = defineStore('user', () => {

  // the state
  const userName = ref('');
  const userDate = ref('');

  function loadUserFromStorage() {
    const savedUserName = localStorage.getItem('name');
    if (savedUserName) {
      userName.value = savedUserName;
    }
    const savedDate = localStorage.getItem('date');
    if (savedDate) {
      userDate.value = savedDate;
    }
  }

  function removeRecord() {
    localStorage.removeItem('name');
    localStorage.removeItem('date');
    localStorage.removeItem('todo-app-data');
    window.location.href = '/';
  }

  function setName() {
    const name: string | null = prompt('!!All record deleted!!\nEnter your name:');
    const date: string | null = prompt('What is the date for today?\n(I lost the concept of time)');
    if (name && date) {
      localStorage.setItem('name', name);
      localStorage.setItem('date', date);
      window.location.reload();
    }
  }
  // Return everything so our components can use them
  return {
    userName,
    userDate,
    loadUserFromStorage,
    removeRecord,
    setName,
  };
});
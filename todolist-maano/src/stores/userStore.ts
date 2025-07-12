import { defineStore } from 'pinia';
import { ref } from 'vue';

// 'defineStore' creates our store. 'main' is its unique ID.
export const useUserStore = defineStore('user', () => {

  // --- STATE (The Data) ---
  const userName = ref('');
  const userDate = ref('');

  // --- ACTIONS (The Functions) --
  function loadUserFromStorage() {
    const savedUserName = localStorage.getItem('name');
    if (savedUserName) {
      userName.value = savedUserName;
    }
    const savedDate = localStorage.getItem('date');
    if (savedDate){
        userDate.value = savedDate;
    }
  }

  function removeRecord() {
    localStorage.removeItem('name');
    localStorage.removeItem('date');
    localStorage.removeItem('todo-app-data');
    window.location.reload();
  }
  
  // Return everything so our components can use them
  return {
    userName,
    userDate,
    loadUserFromStorage,
    removeRecord
  };
});
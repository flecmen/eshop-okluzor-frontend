import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';
import { User } from 'src/types/dbTypes';
import config from '../config'
import { useUserStore } from './user-store';
const userStore = useUserStore();

export const useAdminStore = defineStore('adminStore', () => {

  const users = ref<User[]>([] as User[]);

  async function createUser(user: User) {
    try {
      userStore.isProcessing = true;
      const response = await axios.put(config.backendUrl + '/user', user);
      userStore.isProcessing = false;
      return response.data;
    } catch (err) {
      userStore.isProcessing = false;
      if (!userStore.error) userStore.error = 'něco se stalo ' + err;
    }
  }

  async function loadUsers() {
    try {
      userStore.isProcessing = true;
      const response = await axios.get(config.backendUrl + '/user');
      users.value = response.data;
    } catch (err) {
      userStore.error = 'něco se stalo ' + err;
    }
  }

  return {
    createUser,
    loadUsers,
    users,
  };
});

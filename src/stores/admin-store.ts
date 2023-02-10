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
      userStore.isProcessing = false;
    } catch (err) {
      userStore.error = 'něco se stalo ' + err;
    }
  }

  function getUserById(userId: number): User | undefined {
    return users.value.find(user => user.id === userId);
  }

  async function editUser(user: User): Promise<boolean> {
    try {
      const response = await axios.put(config.backendUrl + '/user/' + user.id, user)
      users.value[users.value.findIndex(u => u.id === user.id)] = user
      return response.data !== undefined
    } catch (err) {
      userStore.error = 'Chyba při updatování zákazníka'
    }
  }

  return {
    createUser,
    loadUsers,
    getUserById,
    users,
    editUser,
  };
});

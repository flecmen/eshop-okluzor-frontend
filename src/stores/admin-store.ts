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
      //edit usera podle id
      if (user.id !== undefined) {
        const response = await axios.put(config.backendUrl + '/user/' + user.id, user)
        users.value[users.value.findIndex(u => u.id === user.id)] = user
        return response.data !== undefined

        //Tvorba nového usera
      } else {
        const response = await axios.put(config.backendUrl + '/user', user)
        users.value.push(user)
        return response.data !== undefined
      }
    } catch (err) {
      userStore.error = 'Chyba při updatování zákazníka'
      return false
    }
  }

  async function deleteUser(userId: number) {
    await axios.delete(config.backendUrl + '/user/' + userId)
    users.value.splice(users.value.findIndex(u => u.id === userId), 1)
    return
  }

  return {
    createUser,
    loadUsers,
    getUserById,
    users,
    editUser,
    deleteUser,
  };
});

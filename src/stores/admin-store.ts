import { User, Branch } from './../types/dbTypes';
import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';
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

  function getUserById(userId: number): User {
    return users.value.find(user => user.id === userId);
  }

  function getBranchById(userId: number, branchId: number): Branch {
    return users.value.find(user => user.id === userId).branch.find(branch => branch.id === branchId);
  }

  async function editOrCreateUser(user: User): Promise<boolean> {
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

  async function editOrCreateBranch(userId: number, branch: Branch): Promise<boolean> {
    //existuje user
    if (!getUserById(userId)) return false
    //edit branche podle ID
    if (branch.id) {
      const response = await axios.put(config.backendUrl + '/branch/' + branch.id, branch)
      getBranchById(userId, branch.id).value = response.data;
      return response.data !== undefined;
    }
    //Tvorba nové branche
    else{
      const response = await axios.put(config.backendUrl + '/user/' + userId + '/branch', branch)
      getUserById(userId).branch.push(response.data)
      return response.data !== undefined;
    }
  }

  async function deleteUser(userId: number) {
    await axios.delete(config.backendUrl + '/user/' + userId)
    users.value.splice(users.value.findIndex(u => u.id === userId), 1)
    return
  }

  async function deleteBranch(userId: number, branchId: number) {
    await axios.delete(config.backendUrl + '/branch/' + branchId)
    getUserById(userId).branch.splice(branch => branch.id === branchId, 1)
  }

  return {
    createUser,
    loadUsers,
    getUserById,
    users,
    editOrCreateUser,
    deleteUser,
    getBranchById,
    editOrCreateBranch,
    deleteBranch,
  };
});

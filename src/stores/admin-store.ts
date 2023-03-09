import { User, Branch, Order } from './../types/dbTypes';
import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';
import config from '../config'
import { useUserStore } from './user-store';
const userStore = useUserStore();


export const useAdminStore = defineStore('adminStore', () => {

  const users = ref<User[]>([] as User[]);
  const orders = ref<Order[]>([] as Order[])

  async function createUser(user: User) {
    try {
      userStore.isProcessing = true;
      const response = await axios.put(config.backendUrl + '/user', user);
      return response.data;
    } catch (err) {
      if (!userStore.error) userStore.error = 'něco se stalo ' + err;
    }
    userStore.isProcessing = false;
  }

  async function loadUsers() {
    try {
      userStore.isProcessing = true;
      const response = await axios.get(config.backendUrl + '/user');
      users.value = response.data;
    } catch (err) {
      userStore.error = 'něco se stalo ' + err;
    }
    userStore.isProcessing = false;
  }

  async function loadNewOrders() {
    try {
      userStore.isProcessing = true;
      const response = await axios.get(config.backendUrl + '/order/status/objednano')
      for (const order of response.data) {
        if (!orders.value.includes(order))
          orders.value.push(order)
      }
    } catch (err) {
      userStore.error = 'něco se stalo ' + err;
    }
    userStore.isProcessing = false;
  }

  function getUserById(userId: User['id']): User | undefined {
    console.log('getUserById, users: ', users.value)
    console.log(userId)
    console.log('getUserById, user: ', users.value.find(u => u.id == userId))
    return users.value.find(u => u.id === userId);
  }

  async function getBranchById(branchId: Branch['id']) {
    const user = users.value.find(u =>
      u.branch?.find(b => b.id === branchId) !== undefined
    )
    console.log(user)
    return user?.branch?.find(branch => branch.id === branchId);
  }

  function getOrderById(orderId: Branch['id']): Order | undefined {
    return orders.value?.find(o => o.id === orderId)
  }

  function setUserLocally(userId: User['id'], user: User) {
    const userIndex: number = users.value.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
      users.value[userIndex] = user
    }
  }

  function setBranchLocally(userId: User['id'], branch: Branch) {
    const user = getUserById(userId)
    if (user) {
      const branchIndex = user.branch?.findIndex(b => b.id === branch.id) as number;
      if (branchIndex !== -1 && user.branch) {
        user.branch[branchIndex] = branch;
      }
    }
  }

  function setOrderLocally(orderId: Order['id'], order: Order) {
    orders.value[orders.value?.findIndex(o => o.id === orderId)] = order
  }

  async function editOrCreateUser(user: User): Promise<boolean> {
    try {
      //edit usera podle id
      if (user.id !== undefined && getUserById(user.id) !== undefined) {
        const response = await axios.put(config.backendUrl + '/user/' + user.id, user)
        if (response)
          setUserLocally(user.id, user)
        return response.data !== undefined

        //Tvorba nového usera
      } else {
        if (!user.password) user.password = 'heslo'
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
      if (response.status === 200) setBranchLocally(userId, branch);
      else console.error('Nepodařilo se odeslat změny')
      return response.data !== undefined;
    }
    //Tvorba nové branche
    else {
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
    loadNewOrders,
    getUserById,
    users,
    orders,
    editOrCreateUser,
    deleteUser,
    getBranchById,
    getOrderById,
    setOrderLocally,
    editOrCreateBranch,
    deleteBranch,
  };
},
  {
    persist: true
  });

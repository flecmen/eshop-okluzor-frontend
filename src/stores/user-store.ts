import { User } from './../types/dbTypes';
import { defineStore } from 'pinia';
import axios from 'axios';
import { ref, computed } from 'vue';
import config from '../config'

export const useUserStore = defineStore('userStore', () => {
  const token = ref(localStorage.getItem('token'));

  if (token.value) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token.value;
  }

  const user = ref<User>({} as User)
  const error = ref<string | null>(null);
  const success = ref<string | null>(null)
  const message = ref<string | null>(null);
  const afterLoginRoute = ref<string | null>(null);
  const isProcessing = ref<boolean>(false);


  const isAuthenticated = computed(() => token.value !== null)

  async function login(email: User['email'], password: User['password']) {
    try {
      isProcessing.value = true;
      const data = { email, password }
      const response = await axios.post(config.backendUrl + '/auth/login', data)

      token.value = response.data.token;
      user.value = response.data.user;
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token.value;
      localStorage.setItem('token', token.value as string);

      error.value = null;
      message.value = null;
      isProcessing.value = false;

    } catch (response) {
      //TODO doladit errorové zprávy podle kódu
      isProcessing.value = false;
      error.value = 'Nesprávný email, nebo heslo ' + response
    }
  }

  function logout() {
    token.value = null;
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }

  function setAfterLoginRoute(route: string | null) {
    afterLoginRoute.value = route;
  }

  function setMessage(msg: string | null) {
    message.value = msg;
  }

  function clearError() {
    error.value = null;
  }

  function clearMessage() {
    message.value = null;
  }
  function clearSuccess() {
    success.value = null;
  }


  return {
    token,
    user,
    error,
    message,
    afterLoginRoute,
    isAuthenticated,
    isProcessing,
    login,
    logout,
    setAfterLoginRoute,
    setMessage,
    clearError,
    clearMessage,
    success,
    clearSuccess,
  };
},
  {
    persist: true
  });

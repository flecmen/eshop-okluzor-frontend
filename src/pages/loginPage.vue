<template>
  <q-form class="fixed-center col-md-3 col-sm-5 col-xs-12" @submit="login()">
    <errorBanner />
    <q-input
      v-model="email"
      label="email"
      type="email"
      lazy-rules
      :rules="[rules.required, rules.isEmail]"
    />
    <q-input
      v-model="password"
      label="heslo"
      type="password"
      :rules="[rules.required]"
    />
    <q-btn
      class="float-right"
      color="primary"
      label="přihlásit"
      type="submit"
    ></q-btn>
  </q-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from 'src/stores/user-store';
import { useRouter } from 'vue-router';
import errorBanner from 'src/components/banners/errorBanner.vue';

import config from 'src/config';
const userStore = useUserStore();
const router = useRouter();

const email = ref('');
const password = ref('');

const rules = {
  required: (value: string) => !!value || 'Required',
  isEmail: (value: string) =>
    config.regex_email.test(value) || 'Zadejte platný email',
};

async function login() {
  //await $refs.form.validate();
  //if (!this.formValid) return;
  await userStore.login(email.value, password.value);

  if (!userStore.error) {
    router.push(userStore.afterLoginRoute ?? { name: 'home' });
    userStore.setAfterLoginRoute(null);
  }
}
</script>
<style>
.c_login_form {
  max-width: 400px;
}
</style>

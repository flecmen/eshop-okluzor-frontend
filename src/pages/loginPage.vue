<template>
  <q-form
    class="fixed-center col-xl-1 col-md-2 col-sm-3 col-xs-12"
    @submit="login()"
  >
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
      :loading="userStore.isProcessing"
    ></q-btn>
  </q-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from 'src/stores/user-store';
import { useRouter } from 'vue-router';
import config from 'src/config';
import useNotify from 'src/composables/useNotify';

const userStore = useUserStore();
const router = useRouter();
const notify = useNotify();

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
    notify.success('Úspěšně přihlášen!');
    router.push(userStore.afterLoginRoute ?? { name: 'home' });
    userStore.setAfterLoginRoute(null);
  } else {
    notify.fail(userStore.error);
  }
}
</script>
<style></style>

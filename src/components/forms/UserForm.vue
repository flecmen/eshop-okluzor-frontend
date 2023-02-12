<template>
  <q-form class="col-md-5" ref="userForm" @submit="btnFunction()">
    <errorBanner />
    <successBanner />
    <q-input
      v-model="user.nazev_firmy"
      label="firma"
      :rules="[rules.required]"
    />
    <q-input v-model="user.ico" label="ičo" :rules="[rules.required]" />
    <q-input v-model="user.dic" label="dič" :rules="[rules.required]" />
    <q-input v-model="user.tel" label="tel" />
    <q-input
      v-model="user.email"
      label="email"
      :rules="[rules.required, rules.isEmail]"
    />
    <q-input
      v-model="user.address.mesto"
      label="město"
      :rules="[rules.required]"
    />
    <q-input
      v-model="user.address.ulice"
      label="ulice"
      :rules="[rules.required]"
    />
    <q-input v-model="user.address.cislo_popis" label="číslo popisné" />
    <q-input v-model="user.address.cislo_orient" label="číslo orientační" />
    <q-input v-model="user.address.psc" label="psč" :rules="[rules.required]" />
    <q-btn
      class="float-right"
      color="primary"
      :loading="userStore.isProcessing"
      label="odeslat"
      type="submit"
      ref="button"
    >
      <template v-slot:loading> <q-spinner-facebook /> </template>
    </q-btn>
  </q-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { User } from '../../types/dbTypes';
import blankObjects from '../../types/blankObjects';
import config from 'src/config';
import { useUserStore } from 'src/stores/user-store';
import { useAdminStore } from 'src/stores/admin-store';
import errorBanner from '../banners/errorBanner.vue';
import successBanner from '../banners/successBanner.vue';

export interface Props {
  userProp?: User;
  type: string;
}

const userStore = useUserStore();
const adminStore = useAdminStore();
const props = defineProps<Props>();
const reset = ref(false);
const button = ref(null);

let user = reactive({} as User);

if (props.userProp === undefined) {
  user = blankObjects.blankUser;
} else {
  user = reactive(props.userProp);
}

const rules = {
  required: (value: string) => !!value || 'Required',
  isEmail: (value: string) =>
    config.regex_email.test(value) || 'Zadejte platný email',
};

const btnFunction = () => {
  if (props.type === 'new') adminStore.createUser(user);
  else if (props.type === 'update') console.log('dodělat');
  reset.value = true;
  if (!userStore.error) {
    user = blankObjects.blankUser;
    userStore.message = 'Úspěch';
  }
};

//const user = ref(props.userProp);
</script>

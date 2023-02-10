<template>
  <q-form class="" ref="userForm">
    <errorBanner />
    <successBanner />
    <q-input
      v-model="formUser.nazev_firmy"
      label="firma"
      :rules="[rules.required]"
    />
    <q-input v-model="formUser.ico" label="ičo" :rules="[rules.required]" />
    <q-input v-model="formUser.dic" label="dič" :rules="[rules.required]" />
    <q-input v-model="formUser.tel" label="tel" />
    <q-input
      v-model="formUser.email"
      label="email"
      :rules="[rules.required, rules.isEmail]"
    />
    <q-input
      v-model="formUser.address.mesto"
      label="město"
      :rules="[rules.required]"
    />
    <q-input
      v-model="formUser.address.ulice"
      label="ulice"
      :rules="[rules.required]"
    />
    <q-input v-model="formUser.address.cislo_popis" label="číslo popisné" />
    <q-input v-model="formUser.address.cislo_orient" label="číslo orientační" />
    <q-input
      v-model="formUser.address.psc"
      label="psč"
      :rules="[rules.required]"
    />
  </q-form>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue';
import { User, Address } from '../../types/dbTypes';
import blankObjects from '../../types/blankObjects';
import config from 'src/config';
import errorBanner from '../banners/errorBanner.vue';
import successBanner from '../banners/successBanner.vue';

export interface Props {
  userProp?: User;
  type: string;
  sendData?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  sendData: false,
});

let formUser = reactive({} as User);
formUser.address = reactive({} as Address);

onMounted(() => {
  console.log('lifetimeHOOK userform');
  if (props.userProp === undefined) {
    formUser = blankObjects.blankUser;
  } else {
    Object.assign(formUser, props.userProp);
  }
});

if (props.userProp === undefined) {
  formUser = blankObjects.blankUser;
} else {
  Object.assign(formUser, props.userProp);
}

const rules = {
  required: (value: string) => !!value || 'Required',
  isEmail: (value: string) =>
    config.regex_email.test(value) || 'Zadejte platný email',
};

const emit = defineEmits<{
  (event: 'expose-form-data', user: User): void;
}>();

function exposeFormData() {
  emit('expose-form-data', formUser);
}

defineExpose({
  exposeFormData,
});

//const user = ref(props.userProp);
</script>

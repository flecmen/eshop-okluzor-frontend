<template>
  <q-form ref="userForm">
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
import { reactive, onMounted, ref } from 'vue';
import { User, Address } from '../../types/dbTypes';
import { useUserStore } from 'src/stores/user-store';
import blankObjects from '../../types/blankObjects';
import config from 'src/config';

export interface Props {
  userProp?: User;
  sendData?: boolean;
}

const userStore = useUserStore();

const props = withDefaults(defineProps<Props>(), {
  sendData: false,
});

let formUser = reactive({} as User);
formUser.address = reactive({} as Address);

onMounted(() => {
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

const userForm = ref(null);

async function exposeFormData() {
  if (await userForm.value.validate()) {
    emit('expose-form-data', formUser);
    userStore.error = null;
  } else userStore.error = 'Něco ve formuláři chybí!';
}

defineExpose({
  exposeFormData,
});

//const user = ref(props.userProp);
</script>

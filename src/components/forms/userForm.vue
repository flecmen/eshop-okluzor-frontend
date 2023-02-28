<template>
  <q-form ref="userForm">
    <q-input
      v-model="formUser.nazev_firmy"
      label="firma"
      :rules="[form_rules.required]"
    />
    <q-input
      v-model="formUser.ico"
      label="ičo"
      :rules="[form_rules.required]"
    />
    <q-input
      v-model="formUser.dic"
      label="dič"
      :rules="[form_rules.required]"
    />
    <q-select
      v-model="formUser.payment_method"
      :options="Object.keys(Payment_method)"
      label="Platební metoda"
    />
    <q-input v-model="formUser.tel" label="tel" />
    <q-input
      v-model="formUser.email"
      label="email"
      :rules="[form_rules.required, form_rules.isEmail]"
    />
    <q-input
      v-model="formUser.address.mesto"
      label="město"
      :rules="[form_rules.required]"
    />
    <q-input
      v-model="formUser.address.ulice"
      label="ulice"
      :rules="[form_rules.required]"
    />
    <q-input v-model="formUser.address.cislo_popis" label="číslo popisné" />
    <q-input v-model="formUser.address.cislo_orient" label="číslo orientační" />
    <q-input
      v-model="formUser.address.psc"
      label="psč"
      :rules="[form_rules.required]"
    />
  </q-form>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { User, Payment_method } from 'src/types/dbTypes';
import useNotify from 'src/composables/useNotify';
import blankObjects from 'src/types/blankObjects';
import form_rules from 'src/utils/form_rules';
import { useAdminStore } from 'src/stores/admin-store';

export interface Props {
  userId?: User['id'];
}

const notify = useNotify();
const adminStore = useAdminStore();

const props = defineProps<Props>();

let formUser = ref<User>();
//Aby to neřvalo errory že .nazev_firmy je undefined
formUser.value = JSON.parse(JSON.stringify(blankObjects.blankUser));

onMounted(() => {
  //pro smazání předešlých informací
  formUser.value = JSON.parse(JSON.stringify(blankObjects.blankUser));
  if (props.userId) {
    formUser.value = JSON.parse(
      JSON.stringify(adminStore.getUserById(props.userId))
    );
  }
});

const emit = defineEmits<{
  (event: 'expose-form-data', user: User): void;
}>();

const userForm = ref();

async function exposeFormData() {
  if (await userForm.value.validate()) {
    emit('expose-form-data', formUser.value);
  } else notify.fail('Něco ve formuláři chybí!');
}

defineExpose({
  exposeFormData,
});
</script>

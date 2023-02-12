<template>
  <q-form ref="branchForm">
    <q-input v-model="formBranch.tel" label="tel" />
    <q-input
      v-model="formBranch.email"
      label="email"
      :rules="[rules.isEmail]"
    />
    <q-input
      v-model="formBranch.address.mesto"
      label="město"
      :rules="[rules.required]"
    />
    <q-input
      v-model="formBranch.address.ulice"
      label="ulice"
      :rules="[rules.required]"
    />
    <q-input v-model="formBranch.address.cislo_popis" label="číslo popisné" />
    <q-input
      v-model="formBranch.address.cislo_orient"
      label="číslo orientační"
    />
    <q-input
      v-model="formBranch.address.psc"
      label="psč"
      :rules="[rules.required]"
    />
  </q-form>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue';
import { User, Address, Branch } from 'src/types/dbTypes';
import { useUserStore } from 'src/stores/user-store';
import useNotify from 'src/composables/useNotify';
import config from 'src/config';
import blankObjects from 'src/types/blankObjects';

export interface Props {
  branchProp?: Branch;
  sendData?: boolean;
  userId: User['id'];
}

const userStore = useUserStore();
const notify = useNotify();

const props = withDefaults(defineProps<Props>(), {
  sendData: false,
});

let formBranch = reactive({} as Branch);
formBranch.address = reactive({} as Address);

onMounted(() => {
  if (props.branchProp === undefined) {
    formBranch = blankObjects.blankBranch;
  } else {
    Object.assign(formBranch, props.branchProp);
  }
  console.log('mounted fromBranch: ' + formBranch.id);
});

if (props.branchProp === undefined) {
  formBranch = blankObjects.blankBranch;
} else {
  Object.assign(formBranch, props.branchProp);
}
const rules = {
  required: (value: string) => !!value || 'Required',
  isEmail: (value: string) =>
    config.regex_email.test(value) || 'Zadejte platný email',
};

const emit = defineEmits<{
  (event: 'expose-form-data', branch: Branch): void;
}>();

const branchForm = ref(null);

async function exposeFormData() {
  if (await branchForm.value.validate()) {
    emit('expose-form-data', formBranch);
  } else notify.fail('Něco ve formuláři chybí!');
}

defineExpose({
  exposeFormData,
});
</script>

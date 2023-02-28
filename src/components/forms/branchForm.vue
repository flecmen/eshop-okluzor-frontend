<template>
  <q-form ref="branchForm">
    <q-input v-model="formBranch.branch_name" label="název pobočky" />
    <q-input v-model="formBranch.tel" label="tel" />
    <q-input
      v-model="formBranch.email"
      label="email"
      :rules="[form_rules.isEmail]"
    />
    <q-input
      v-model="formBranch.address.mesto"
      label="město"
      :rules="[form_rules.required]"
    />
    <q-input
      v-model="formBranch.address.ulice"
      label="ulice"
      :rules="[form_rules.required]"
    />
    <q-input v-model="formBranch.address.cislo_popis" label="číslo popisné" />
    <q-input
      v-model="formBranch.address.cislo_orient"
      label="číslo orientační"
    />
    <q-input
      v-model="formBranch.address.psc"
      label="psč"
      :rules="[form_rules.required]"
    />
    <q-toggle v-model="formBranch.plati_postovne" label="Platí poštovné" />
  </q-form>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { User, Branch } from 'src/types/dbTypes';
import useNotify from 'src/composables/useNotify';
import form_rules from 'src/utils/form_rules';
import blankObjects from 'src/types/blankObjects';
import { useAdminStore } from 'src/stores/admin-store';

export interface Props {
  branchId?: Branch['id'];
  userId: User['id'];
}

const notify = useNotify();
const adminStore = useAdminStore();

const props = defineProps<Props>();

//Vyplnění formBrnach prázdnými údaji
let formBranch = ref();
formBranch.value = blankObjects.blankBranch.value;

onMounted(() => {
  //Pokud máme branchID, nahradit prázdná pole těmi správnými
  if (props.branchId) {
    formBranch.value = JSON.parse(
      JSON.stringify(
        adminStore.getBranchById(props.userId, props.branchId) as Branch
      )
    );
  }
});

const emit = defineEmits<{
  (event: 'expose-form-data', branch: Branch): void;
}>();

const branchForm = ref();

async function exposeFormData() {
  if (await branchForm.value.validate()) {
    emit('expose-form-data', formBranch.value);
  } else notify.fail('Něco ve formuláři chybí!');
}

defineExpose({
  exposeFormData,
});
</script>

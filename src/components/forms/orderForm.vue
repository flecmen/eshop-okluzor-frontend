<template>
  <q-form ref="userForm">
    <q-select
      v-model="formOrder.branchId"
      :options="branchOptions"
      label="Optika (pobočka)"
      :rules="[form_rules.required]"
      use-input
      emit-value
      map-options
      clearable
      behavior="menu"
      @update:model-value="selected_branch_changed"
      @filter="filterBranches"
    />
  </q-form>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Order } from 'src/types/dbTypes';
import useNotify from 'src/composables/useNotify';
import blankObjects from 'src/types/blankObjects';
import form_rules from 'src/utils/form_rules';
import { useAdminStore } from 'src/stores/admin-store';
import config from 'src/config';

export interface Props {
  orderId?: Order['id'];
}

const notify = useNotify();
const adminStore = useAdminStore();

const props = defineProps<Props>();

//Aby to neřvalo errory že .nazev_firmy je undefined
const formOrder = ref<Order>(
  JSON.parse(JSON.stringify(blankObjects.blankOrder))
);

const branchOptions = ref<{ label: string | null; value: number }[]>([]);

const reloadBranches = () => {
  let pomBranchOpions: { label: string | null; value: number }[] = [];
  const usersCopy = JSON.parse(JSON.stringify(adminStore.users));
  for (let u of usersCopy) {
    if (u.branch !== undefined) {
      for (let b of u?.branch) {
        pomBranchOpions.push({
          label:
            b.branch_name + ' ' + 'adresa: ' + config.formatAddress(b.address),
          value: b.id,
        });
      }
    }
  }
  branchOptions.value = pomBranchOpions;
};
// načtení všech branchí do branchoptions
onMounted(() => {
  reloadBranches();
});

function selected_branch_changed(val: number) {
  emit('expose-branchId', val);
  // fill branchOptions based on selected user
}

function filterBranches(val: string, update) {
  if (val === '') {
    reloadBranches();
    return;
  }
  update(() => {
    console.log('V updatu');
    const needle = val.toLowerCase();
    reloadBranches();
    branchOptions.value = branchOptions.value.filter(
      (v) => v?.label.toLowerCase().indexOf(needle) > -1
    );
  });
}

onMounted(() => {
  //pro smazání předešlých informací
  formOrder.value = JSON.parse(JSON.stringify(blankObjects.blankOrder));
  if (props.orderId) {
    formOrder.value = JSON.parse(
      JSON.stringify(adminStore.getOrderById(props.orderId))
    );
  }
});

const emit = defineEmits<{
  (event: 'expose-form-data', order: Order): void;
  (event: 'expose-branchId', branchId: number): void;
}>();

const orderForm = ref();

async function exposeFormData() {
  if (await orderForm.value.validate()) {
    emit('expose-form-data', formOrder.value);
  } else notify.fail('Něco ve formuláři chybí!');
}

defineExpose({
  exposeFormData,
});
</script>

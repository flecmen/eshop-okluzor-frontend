<template>
  <div class="row justify-center" v-if="showCustomerTable">
    <customersTable @show-branches="showBranches" />
  </div>
  <div v-else>
    <q-btn label="Zpět k zákazníkům" @click="revertShowCustomerTable()"></q-btn>
    <div class="row justify-center">
      <branchesTable :userId="activeUserId" />
    </div>
  </div>
</template>

<script setup lang="ts">
import customersTable from 'src/components/tables/customersTable.vue';
import branchesTable from 'src/components/tables/branchesTable.vue';
import { ref } from 'vue';

const showCustomerTable = ref(true);
const activeUserId = ref(-1);

const showBranches = (userId: number) => {
  activeUserId.value = userId;
  revertShowCustomerTable();
};

const revertShowCustomerTable = () => {
  showCustomerTable.value = !showCustomerTable.value;
};
</script>

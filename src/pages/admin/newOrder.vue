<template>
  <h2>Nová objednávka</h2>
  <div class="q-pa-md row items-start q-gutter-md">
    <fakt_addr_info_card :user="user" />
    <dod_addr_info_card :branch="branch" />
  </div>
  <orderForm @expose-branchId="showSelectedUserInfo" :order="order">
  </orderForm>
  <products-picker-table :order="order" />
</template>

<script setup lang="ts">
import fakt_addr_info_card from 'src/components/cards/fakt_addr_info_card.vue';
import dod_addr_info_card from 'src/components/cards/dod_addr_info_card.vue';
import productsPickerTable from 'src/components/tables/productsPickerTable.vue';
import orderForm from 'src/components/forms/orderForm.vue';
import { ref, onMounted } from 'vue';
import { User, Branch, Order } from 'src/types/dbTypes';
import { useAdminStore } from 'src/stores/admin-store';
import { useProductStore } from 'src/stores/product-store';
import useNotify from 'src/composables/useNotify';
import blankObjects from 'src/types/blankObjects';

const adminStore = useAdminStore();
const productStore = useProductStore();
const notify = useNotify();

const user = ref<User>();
const branch = ref<Branch>();
const order = ref<Order>(JSON.parse(JSON.stringify(blankObjects.blankOrder)));

onMounted(async () => {
  await productStore.loadProducts();
});

async function showSelectedUserInfo(branchId: number) {
  branch.value = await adminStore.getBranchById(branchId);
  user.value = adminStore.getUserById(branch.value?.userId as number);
  return;
}
</script>

<template>
  <h2>Nová objednávka</h2>
  <div class="q-pa-md row items-start q-gutter-md">
    <fakt_addr_info_card :user="user" />
    <dod_addr_info_card :branch="branch" />
  </div>
  <orderForm @expose-branchId="showSelectedUserInfo"> </orderForm>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { User, Branch } from 'src/types/dbTypes';
import orderForm from 'src/components/forms/orderForm.vue';
import { useAdminStore } from 'src/stores/admin-store';
import useNotify from 'src/composables/useNotify';
import config from 'src/config';
import fakt_addr_info_card from 'src/components/cards/fakt_addr_info_card.vue';
import dod_addr_info_card from 'src/components/cards/dod_addr_info_card.vue';

const adminStore = useAdminStore();
const notify = useNotify();

const user = ref<User>();
const branch = ref<Branch>();

async function showSelectedUserInfo(branchId: number) {
  branch.value = await adminStore.getBranchById(branchId);
  user.value = adminStore.getUserById(branch.value?.userId as number);
  return;
}
</script>

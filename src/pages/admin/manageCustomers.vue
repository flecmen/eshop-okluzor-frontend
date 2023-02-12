<template>
  <div class="row justify-center"><customersTable /></div>
</template>

<script setup lang="ts">
import customersTable from 'src/components/tables/customersTable.vue';
import { useUserStore } from 'src/stores/user-store';
import { User } from 'src/types/dbTypes';
const userStore = useUserStore();
</script>

<template>
  <q-banner v-if="userStore.error" class="bg-negative text-white" rounded>
    <q-icon name="report" size="md"></q-icon>
    {{ userStore.error }}
    <q-btn
      dense
      flat
      icon="close"
      class="float-right"
      @click="userStore.clearError()"
    />
  </q-banner>
</template>

<script setup lang="ts">
import { useUserStore } from 'src/stores/user-store';
const userStore = useUserStore();
if (userStore.error) {
  setTimeout(() => {
    userStore.error = null;
  }, 10000);
}
</script>

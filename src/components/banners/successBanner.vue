<template>
  <q-banner v-if="userStore.success" class="bg-positive text-white" rounded>
    <q-icon name="thumb_up_alt" size="md"></q-icon>
    {{ userStore.success }}
    <q-btn
      dense
      flat
      icon="close"
      class="float-right"
      @click="userStore.clearMessage()"
    />
  </q-banner>
</template>

<script setup lang="ts">
import { useUserStore } from 'src/stores/user-store';
const userStore = useUserStore();

if (userStore.success) {
  setTimeout(() => {
    userStore.clearSuccess();
  }, 10000);
}
</script>

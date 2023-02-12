<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <NavigationBarEshop />
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, onUpdated } from 'vue';
import NavigationBarEshop from '../components/NavigationBarEshop.vue';
import { useRoute } from 'vue-router';
import useNotify from 'src/composables/useNotify';

const route = useRoute();
const notify = useNotify();
const notAdminRerouted = ref(false);

//pokud by user šel někam, kam nemá právo
onUpdated(() => {
  notAdminRerouted.value = route.query.notAdminRerouted as boolean;
  if (notAdminRerouted.value) {
    notify.warning('Přístup odepřen');
    notAdminRerouted.value = false;
  }
});
</script>

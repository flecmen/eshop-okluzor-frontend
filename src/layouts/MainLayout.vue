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
import NavigationBarEshop from '../components/NavigationBarEshop.vue';
</script>

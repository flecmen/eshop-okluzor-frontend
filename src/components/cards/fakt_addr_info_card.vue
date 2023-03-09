<template>
  <q-card class="col">
    <q-card-section>
      <div class="text-h5">Fakturační adresa</div>
    </q-card-section>
    <q-card-section v-if="props.user">
      <div class="text-h6">{{ user?.nazev_firmy }}</div>
      <div class="text">
        {{ config.formatAddress(user?.address as Address) }}
      </div>
      <div class="text">ičo: {{ user?.ico }}</div>
      <div class="text">dič: {{ user?.ico }}</div>
      <div class="text" v-if="user?.tel">tel: {{ user.tel }}</div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { User, Address } from 'src/types/dbTypes';
import config from 'src/config';

export interface Props {
  user?: User;
}
const props = defineProps<Props>();
</script>

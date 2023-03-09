<template>
  <q-card class="col">
    <q-card-section>
      <div class="text-h5">Dodací adresa</div>
    </q-card-section>
    <q-card-section v-if="props.branch">
      <div class="text-h6">{{ branch?.branch_name }}</div>
      <div class="text">
        {{ config.formatAddress(branch?.address as Address) }}
      </div>
      <div class="text" v-if="branch?.tel">tel: {{ branch.tel }}</div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { Branch, Address } from 'src/types/dbTypes';
import config from 'src/config';

export interface Props {
  branch?: Branch;
}
const props = defineProps<Props>();
</script>

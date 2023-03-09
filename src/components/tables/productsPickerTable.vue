<template>
  <q-table title="Produkty"> </q-table>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const table = reactive({
  columns: [
    {
      name: 'checkbox',
      label: '',
    },
    {
      name: 'id',
      field: 'id',
    },
    {
      name: 'name',
      label: 'název',
      field: 'name',
      required: true,
      align: 'left',
    },
  ],
});
</script>

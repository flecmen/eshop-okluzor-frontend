<template>
  <q-table
    title="Zboží:"
    :loading="table.isLoading"
    :rows="table.rows"
    :columns="table.columns"
    row-key="id"
    dense
    :pagination="{ rowsPerPage: 0 }"
    :visible-columns="['checkbox', 'name', 'quantity']"
  >
    <template v-slot:body-cell-checkbox="props">
      <q-td :props="props" class="justify-center">
        <q-checkbox
          v-if="productStore.getItem(props.row.id)?.quantity > 0"
          v-model="selectedItems[props.row.id]"
          color="green"
          size="sm"
        />
        <q-checkbox
          v-else
          v-model="selectedItems[props.row.id]"
          size="sm"
          color="red"
          @update:model-value="addItem(props.row.id)"
        />
      </q-td>
    </template>
    <template v-slot:body-cell-quantity="props">
      <q-td :props="props" class="justify-center q-pa-md">
        <q-input
          v-if="productStore.getItem(props.row.id)?.quantity"
          v-model.number="productStore.getItem(props.row.id).quantity"
          type="number"
          filled
          dense
          min="0"
          style="max-width: 60px"
        />
      </q-td>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref, computed } from 'vue';
import { Product } from 'src/types/dbTypes';
import { useProductStore } from 'src/stores/product-store';
import { useAdminStore } from 'src/stores/admin-store';

const productStore = useProductStore();
const adminStore = useAdminStore();
const selectedItems = computed(() => {
  return productStore.newOrder.order_items.reduce((acc, item) => {
    // if the productId already exists in the accumulator, add the quantity
    if (acc[item.productId]) {
      acc[item.productId] += item.quantity;
    } else {
      // otherwise, initialize the quantity with the item's quantity
      acc[item.productId] = item.quantity;
    }
    return acc;
  }, {} as Record<number, number>);
});

const table = reactive({
  columns: [
    {
      name: 'checkbox',
      label: 'Zvolit',
      align: 'left',
    },
    {
      name: 'id',
      field: 'id',
    },
    {
      name: 'name',
      label: 'název',
      required: true,
      align: 'left',
      field: 'name',
    },
    {
      name: 'quantity',
      label: 'množství',
      field: (product: Product) => {
        if (
          !productStore.newOrder?.order_items.find(
            (i) => i.productId === product.id
          )?.quantity
        )
          return 0;
        else
          return productStore.newOrder?.order_items.find(
            (i) => i.productId === product.id
          )?.quantity;
      },
    },
  ],
  rows: [] as typeof productStore.products,
  isLoading: true,
});

onMounted(async () => {
  await productStore.loadProducts();
  table.rows = productStore.products;
  table.isLoading = false;
});

async function addItem(productId: number) {
  productStore.addOrderItem(productId);
  console.log(productStore.newOrder);
}
</script>

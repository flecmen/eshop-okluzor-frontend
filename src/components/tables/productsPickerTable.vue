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
          v-if="props.row.quantity > 0"
          v-model="selectedItems[props.row.id]"
          color="green"
          size="sm"
          @update:model-value="addItem(props.row.id)"
        />
        <q-checkbox
          v-else
          v-model="selectedItems[props.row.id]"
          size="sm"
          color="red"
        />
      </q-td>
    </template>
    <template v-slot:body-cell-quantity="props">
      <q-td
        :props="props"
        class="justify-center q-pa-md"
        v-if="$props.order.order_items.find((i) => i.id === props.row.id)"
      >
        <q-input
          v-model.number="props.row.quantity"
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
import { reactive, onMounted, ref } from 'vue';
import { Order, Product, Order_item } from 'src/types/dbTypes';
import { useProductStore } from 'src/stores/product-store';

export interface Props {
  order: Order;
}
const props = defineProps<Props>();

const productStore = useProductStore();
const selectedItems = ref<number[]>([]);

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
        if (!props.order.order_items.find((i) => i.id === product.id)?.quantity)
          return 0;
        else
          return props.order.order_items.find((i) => i.id === product.id)
            ?.quantity;
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

function addItem(productId: number) {
  // eslint-disable-next-line vue/no-mutating-props
  //TODO: Vytvoři order-item !
}
</script>

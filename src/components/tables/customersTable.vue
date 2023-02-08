<template>
  <userModal
    :show="showUserModal"
    :user-prop="userModalData"
    @close-modal="revertUserModal"
  ></userModal>
  <div class="q-pa-md">
    <error-banner></error-banner>
    <successBanner />

    <q-table
      title="Zákazníci"
      :rows="rows"
      :columns="columns"
      row-key="name"
      :visible-columns="[
        'edit',
        'nazev_firmy',
        'ico',
        'dic',
        'tel',
        'email',
        'address',
        'branches',
        'orders',
      ]"
    >
      <template v-slot:body-cell-edit="props">
        <q-td :props="props" class="justify-center">
          <q-btn
            dense
            flat
            round
            color="grey"
            icon="edit"
            @click="revertUserModal(props.row.id)"
          ></q-btn>
        </q-td>
      </template>
      <!-- <template v-slot:body-cell-address="props">
        <q-td
          :props="props"
          dense
          color="primary"
          icon="location_on"
          @click="funkce(props)"
        >
          {{ props.row.address.mesto }}
        </q-td>
      </template> -->
      <template v-slot:body-cell-branches="props">
        <q-td :props="props">
          <q-btn dense color="primary" icon="store"></q-btn>
        </q-td>
      </template>
      <template v-slot:body-cell-orders="props">
        <q-td :props="props" class="justify-center">
          <q-btn dense color="primary" icon="list_alt"></q-btn>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { User } from '../../types/dbTypes';
import { useUserStore } from 'src/stores/user-store';
import { useAdminStore } from 'src/stores/admin-store';
import errorBanner from '../banners/errorBanner.vue';
import successBanner from '../banners/successBanner.vue';
import userModal from '../modals/userModal.vue';
function funkce(props) {
  console.log(props);
}
const userStore = useUserStore();
const adminStore = useAdminStore();
const columns = ref([
  // array of Objects
  // column Object definition
  {
    name: 'edit',
    label: '',
    field: '',
    align: 'left',
  },
  {
    name: 'id',
    field: 'id',
  },
  {
    // unique id
    // identifies column
    // (used by pagination.sortBy, "body-cell-[name]" slot, ...)
    name: 'nazev_firmy',

    // label for header
    label: 'Firma',

    // row Object property to determine value for this column
    field: 'nazev_firmy',
    // OR field: row => row.some.nested.prop,

    // (optional) if we use visible-columns, this col will always be visible
    required: true,

    // (optional) alignment
    align: 'left',
    format: (val: string) => `${val}`,
    sortOrder: 'ad', // or 'da'
    headerClasses: 'my-special-class',
  },
  { name: 'ico', label: 'ičo', field: 'ico', align: 'left' },
  { name: 'dic', label: 'dič', field: 'dic', align: 'left' },
  { name: 'tel', label: 'tel', field: 'tel', align: 'left' },
  { name: 'email', label: 'email', field: 'email', align: 'left' },
  {
    name: 'address',
    label: 'adresa',
    align: 'left',
    field: (row: User) =>
      `${row.address.mesto}, ${row.address.ulice} ${row.address.cislo_popis}/${row.address.cislo_orient}, ${row.address.psc}`,
    sortable: true,
  },
  {
    name: 'branches',
    label: 'pobočky',
    field: '',
    align: 'left',
  },
  {
    name: 'orders',
    label: 'objednávky',
    field: '',
    align: 'left',
  },
]);
const rows = ref<typeof adminStore.users>([] as typeof adminStore.users);

onMounted(async () => {
  await adminStore.loadUsers();
  rows.value = ref(adminStore.users).value;
});

const showUserModal = ref(false);
const userModalData = reactive({} as User);
const revertUserModal = (id: number) => {
  showUserModal.value = !showUserModal.value;
};
</script>

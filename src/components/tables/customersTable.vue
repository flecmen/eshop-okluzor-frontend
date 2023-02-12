<template>
  <userModal
    :show="isUserModalVisible"
    :user-prop="userModalData.value"
    @close-modal="revertUserModal"
  ></userModal>
  <div class="q-pa-md">
    <q-btn label="Nový" color="positive" @click="showUserModal()"></q-btn>
    <q-table
      title="Zákazníci"
      :loading="table.isLoading"
      :rows="table.rows"
      :columns="table.columns"
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
      <template v-slot:top-right>
        <div class="q-gutter-md row items-start">
          <q-select
            filled
            v-model="table.searchCol"
            :options="table.searchOptions"
            label="Sloupec"
            dense
            options-dense
            clearable
          />
          <q-input
            borderless
            dense
            debounce="300"
            v-model="table.searchfilter"
            placeholder="Search"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
      </template>
      <template v-slot:body-cell-edit="props">
        <q-td :props="props" class="justify-center">
          <q-btn dense flat round color="grey" icon="delete">
            <q-menu auto-close>
              <q-card class="my-card">
                <q-card-section class="bg-primary text-white">
                  <div class="text">
                    Určitě TRVALE smazat zákazníka "{{
                      props.row.nazev_firmy
                    }}"?
                  </div>
                </q-card-section>

                <q-card-actions align="right">
                  <q-btn
                    flat
                    color="white"
                    class="bg-red"
                    @click="deleteUser(props.row.id)"
                    >Smazat</q-btn
                  >
                </q-card-actions>
              </q-card>
            </q-menu>
          </q-btn>
          <q-btn
            dense
            flat
            round
            color="grey"
            icon="edit"
            @click="showUserModal(props.row.id)"
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
          <q-btn
            dense
            color="primary"
            icon="store"
            @click="emit('show-branches', props.row.id)"
            ><q-badge color="blue" v-if="props.row.branch" floating>{{
              props.row.branch.length
            }}</q-badge>
            <q-badge color="blue" v-else floating>0</q-badge></q-btn
          >
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
import { User } from 'src/types/dbTypes';
import { useAdminStore } from 'src/stores/admin-store';
import userModal from 'src/components/modals/userModal.vue';
import blankObjects from 'src/types/blankObjects';
import useNotify from 'src/composables/useNotify';

const adminStore = useAdminStore();
const notify = useNotify();
const table = reactive({
  columns: [
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
  ],
  rows: [] as typeof adminStore.users,
  isLoading: true,
  searchOptions: ['Firma', 'email'],
  searchCol: '',
  searchfilter: '',
});

onMounted(async () => {
  await adminStore.loadUsers();
  table.rows = adminStore.users;
  table.isLoading = false;
});

const isUserModalVisible = ref(false);
const revertUserModal = () => {
  isUserModalVisible.value = !isUserModalVisible.value;
};

const userModalData = reactive({} as User);
const showUserModal = (userId?: number) => {
  if (userId) userModalData.value = adminStore.getUserById(userId);
  else userModalData.value = blankObjects.blankUser;
  revertUserModal();
};

const deleteUser = (userId: number) => {
  adminStore.deleteUser(userId);
  notify.success('Uživatel smazán');
};

const emit = defineEmits<{
  (event: 'show-branches', userId: number): void;
}>();
</script>

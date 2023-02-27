<template>
  <branchModal
    :show="isBranchModalVisible"
    :branchId="clickedBranchId"
    :userId="props.userId"
    @close-modal="revertBranchModal"
  />
  <div class="q-pa-md">
    <q-btn label="Nový" color="positive" @click="showBranchModal()"></q-btn>
    <q-table
      :title="tableTitle"
      :loading="table.isLoading"
      :rows="table.rows"
      :columns="table.columns"
      row-key="name"
      :visible-columns="[
        'edit',
        'branch_name',
        'tel',
        'email',
        'address',
        'orders',
      ]"
    >
      <template v-slot:body-cell-edit="props">
        <q-td :props="props" class="justify-center">
          <q-btn dense flat round color="grey" icon="delete">
            <q-menu auto-close>
              <q-card class="my-card">
                <q-card-section class="bg-primary text-white">
                  <div class="text">
                    Určitě TRVALE smazat pobočku v"{{
                      props.row.address.mesto
                    }}"?
                  </div>
                </q-card-section>

                <q-card-actions align="right">
                  <q-btn
                    flat
                    color="white"
                    class="bg-red"
                    @click="deleteBranch(props.row.id)"
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
            @click="showBranchModal(props.row.id)"
          ></q-btn>
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
import branchModal from 'src/components/modals/branchModal.vue';
import useNotify from 'src/composables/useNotify';
import { Branch } from 'src/types/dbTypes';

export interface Props {
  userId: User['id'];
}
const props = defineProps<Props>();

const adminStore = useAdminStore();
const notify = useNotify();

const tableTitle = ref('');
const clickedBranchId = ref<Branch['id']>();

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
      name: 'branch_name',
      label: 'Pobočka',
      align: 'left',
      field: 'branch_name',
    },
    { name: 'tel', label: 'tel', field: 'tel', align: 'left' },
    { name: 'email', label: 'email', field: 'email', align: 'left' },
    {
      name: 'address',
      label: 'adresa',
      align: 'left',
      field: (row: User) =>
        `${row.address?.mesto}, ${row.address?.ulice} ${row.address?.cislo_popis}/${row.address?.cislo_orient}, ${row.address?.psc}`,
      sortable: true,
    },
    {
      name: 'orders',
      label: 'objednávky',
      field: '',
      align: 'left',
    },
  ],
  rows: [] as User['branch'],
  isLoading: true,
  searchOptions: ['Firma', 'email'],
  searchCol: '',
  searchfilter: '',
});

onMounted(async () => {
  tableTitle.value =
    'Pobočky firmy "' +
    adminStore.getUserById(props.userId as number)?.nazev_firmy +
    '"';
  table.rows = adminStore.getUserById(props.userId as number)?.branch;
  table.isLoading = false;
});

const isBranchModalVisible = ref(false);
const revertBranchModal = () => {
  isBranchModalVisible.value = !isBranchModalVisible.value;
};

const showBranchModal = (branchId?: number) => {
  if (branchId) {
    if (adminStore.getBranchById(props.userId, branchId))
      clickedBranchId.value = branchId;
  }
  revertBranchModal();
};

const deleteBranch = (branchId: number) => {
  adminStore.deleteBranch(props.userId, branchId);
  notify.success('Pobočka smazána');
};
</script>

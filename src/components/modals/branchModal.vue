<template>
  <q-dialog v-model="$props.show" class="flex">
    <q-card class="my-card">
      <q-card-section class="row justify-center">
        <branchForm
          :branchId="branchId"
          :user-id="userId"
          class="col-11"
          ref="form"
          @expose-form-data="send"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          flat
          label="Zrušit"
          color="primary"
          @click="emit('close-modal')"
        />
        <q-btn
          flat
          label="Potvrdit"
          color="primary"
          :loading="userStore.isProcessing"
          @click="buttonFunction()"
        >
          <template v-slot:loading> <q-spinner-facebook /> </template>
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Branch, User } from 'src/types/dbTypes';
import branchForm from 'src/components/forms/branchForm.vue';
import { useUserStore } from 'src/stores/user-store';
import { useAdminStore } from 'src/stores/admin-store';
import useNotify from 'src/composables/useNotify';

export interface Props {
  branchId?: Branch['id'];
  userId: User['id'];
  show: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
});

const userStore = useUserStore();
const adminStore = useAdminStore();
const notify = useNotify();

const emit = defineEmits<{
  (event: 'close-modal'): void;
}>();

const form = ref<InstanceType<typeof branchForm> | null>(null);

const buttonFunction = async () => {
  await form.value?.exposeFormData();
};

async function send(branch: Branch) {
  userStore.isProcessing = true;
  const isOk = await adminStore.editOrCreateBranch(props.userId, branch);
  userStore.isProcessing = false;
  if (isOk) {
    notify.success('Úspěch');
    emit('close-modal');
  } else {
    notify.fail('Něco ne nepovedlo');
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 400px
</style>

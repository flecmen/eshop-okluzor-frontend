<template>
  <q-dialog v-model="$props.show" class="flex">
    <q-card class="my-card">
      <q-card-section class="row justify-center">
        <userForm
          :userProp="userProp"
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
import { User } from 'src/types/dbTypes';
import userForm from 'src/components/forms/userForm.vue';
import { useUserStore } from 'src/stores/user-store';
import { useAdminStore } from 'src/stores/admin-store';
import useNotify from 'src/composables/useNotify';

export interface Props {
  userProp?: User;
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

const form = ref<InstanceType<typeof userForm> | null>(null);

const buttonFunction = async () => {
  await form.value?.exposeFormData();
};

async function send(user: User) {
  userStore.isProcessing = true;
  const isOk = await adminStore.editOrCreateUser(user);
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

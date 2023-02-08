<template>
  <q-dialog v-model="$props.show">
    <q-card>
      <q-card-section class="row items-center">
        <userForm class="bg-pink-5 align-center"></userForm>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          flat
          label="Cancel"
          color="primary"
          @click="emit('close-modal')"
        />
        <q-btn flat label="Potvrdit" color="primary" @click="send()" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { User } from '../../types/dbTypes';
import blankObjects from '../../types/blankObjects';
import UserForm from '../forms/UserForm.vue';

export interface Props {
  userProp?: User;
  show: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
});

let user = reactive({} as User);

if (props.userProp === undefined) {
  user = blankObjects.blankUser;
} else {
  user = reactive(props.userProp);
}

const emit = defineEmits<{
  (event: 'close-modal'): void;
}>();

async function send() {
  emit('close-modal');
  return;
}
//const user = ref(props.userProp);
</script>

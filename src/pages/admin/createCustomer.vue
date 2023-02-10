<template>
  <div class="row justify-center">
    <h4>Vytvořit zákazníka</h4>
  </div>

  <div class="row justify-center">
    <UserForm class="col-md-3 col-sm-5 col-xs-12" :type="'new'" />
  </div>
</template>

<script setup lang="ts">
import UserForm from 'src/components/forms/userForm.vue.js';
import { useUserStore } from 'src/stores/user-store';
import { User } from 'src/types/dbTypes';
const userStore = useUserStore();
</script>

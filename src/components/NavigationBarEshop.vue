<template>
  <q-toolbar>
    <q-btn flat round dense icon="menu" class="q-mr-sm" />
    <q-avatar style="width: fit-content" square>
      <img src="src/assets/Logo.png" />
    </q-avatar>
    <q-space />
    <q-btn-dropdown stretch flat label="Admin">
      <q-list>
        <q-item
          clickable
          v-close-popup
          tabindex="0"
          :to="{ name: 'manageCustomers' }"
        >
          <q-item-section avatar>
            <q-avatar icon="folder" color="secondary" text-color="white" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Zákazníci</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
    <q-btn flat round dense icon="account_circle">
      <q-menu>
        <q-list>
          <q-item clickable v-close-popup tabindex="0" @click="logout()">
            <q-item-section>
              <q-item-label>Odhlásit se</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
  </q-toolbar>
</template>

<script setup lang="ts">
import { useUserStore } from 'src/stores/user-store';
import { useRouter } from 'vue-router';
const userStore = useUserStore();
const router = useRouter();

function logout() {
  userStore.logout();
  router.push({ name: 'login' });
}
</script>

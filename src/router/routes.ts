import { useUserStore } from 'src/stores/user-store';
import { RouteRecordRaw } from 'vue-router';
import MainLayout from 'layouts/MainLayout.vue';
import BlankLayout from 'layouts/BlankLayout.vue'



const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: BlankLayout,
    children: [
      {
        path: '',
        name: 'login',
        component: () => import('pages/loginPage.vue'),
      }
    ]
  },
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('pages/IndexPage.vue')
      },
      {
        path: 'admin',
        component: MainLayout,
        beforeEnter: isAdmin,
        children: [
          {
            name: 'manageCustomers',
            path: 'zakaznici',
            component: () => import('pages/admin/manageCustomers.vue')
          },
          {
            name: 'newOrder',
            path: 'nova_objednavka',
            component: () => import('pages/admin/newOrder.vue')
          },
        ],
      },]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

function isAdmin(to, from, next) {
  const userStore = useUserStore();
  if (userStore.user.role === 'Admin') {
    next();
  } else {
    next({ name: 'home', query: { notAdminRerouted: true } })
  }
}




export default routes;

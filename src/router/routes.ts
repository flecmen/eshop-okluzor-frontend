import { RouteRecordRaw } from 'vue-router';
import MainLayout from 'layouts/MainLayout.vue';
import BlankLayout from 'layouts/BlankLayout.vue'



const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: BlankLayout,
    children: [{ path: '', name: 'login', component: () => import('pages/loginPage.vue') }]
  },
  {
    path: '',
    component: MainLayout,
    children: [{ path: '', name: 'home', component: () => import('pages/IndexPage.vue') }]
  },
  {
    path: '/auth',
    name: 'auth',
    components: {
      default: () => import('../AuthSection.vue'),
      contentView: () => import('pages/IndexPage.vue')
    },
    children: [
      {
        path: 'admin',
        component: MainLayout,
        children: [
          {
            name: 'new_user',
            path: 'new',
            component: () => import('pages/admin/createCustomer.vue')
          },
          {
            name: 'manageCustomers',
            path: 'customers',
            component: () => import('pages/admin/manageCustomers.vue')
          }
        ],
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];




export default routes;

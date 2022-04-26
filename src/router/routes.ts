/* eslint-disable @typescript-eslint/no-unused-vars */
import { RouteRecordRaw } from 'vue-router';
import { isLoggedIn } from 'src/services/auth';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/IndexPage.vue'), beforeEnter: (to, from) => isLoggedIn() ? true : false },
      { path: '/all', component: () => import('pages/IndexPage.vue'), beforeEnter: (to, from) => isLoggedIn() ? true : false },
      { path: '/new', component: () => import('pages/NewTask.vue'), beforeEnter: (to, from) => isLoggedIn() ? true : false },
      { path: '/edit/:id', component: () => import('pages/EditTask.vue'), props: { default: true }, beforeEnter: (to, from) => isLoggedIn() ? true : false },
      { path: '/authentication', component: () => import('pages/Authentication.vue'), beforeEnter: (to, from) => !isLoggedIn() ? true : false },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;

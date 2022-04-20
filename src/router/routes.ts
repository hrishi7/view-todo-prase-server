import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/new', component: () => import('pages/NewTask.vue') },
      { path: '/edit/:id', component: () => import('pages/EditTask.vue'), props: { default: true } },
      { path: '/authentication', component: () => import('pages/Authentication.vue'), props: { default: true } },
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

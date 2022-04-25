import { RouteRecordRaw } from 'vue-router';
import { checkAuthentication } from 'src/utils/privateRoutes';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/IndexPage.vue'), beforeEnter: (to, from, next) => checkAuthentication(to, from, next) },
      { path: '/all', component: () => import('pages/IndexPage.vue'), beforeEnter: (to, from, next) => checkAuthentication(to, from, next) },
      { path: '/new', component: () => import('pages/NewTask.vue'), beforeEnter: (to, from, next) => checkAuthentication(to, from, next) },
      { path: '/edit/:id', component: () => import('pages/EditTask.vue'), props: { default: true }, beforeEnter: (to, from, next) => checkAuthentication(to, from, next) },
      { path: '/authentication', component: () => import('pages/Authentication.vue'), props: { default: true }, beforeEnter: (to, from, next) => checkAuthentication(to, from, next) },
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

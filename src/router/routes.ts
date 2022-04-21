import { RouteRecordRaw } from 'vue-router';
import { isLoggedIn } from 'src/services/auth';
import { checkAuthentication } from 'src/utils/privateRoutes';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/IndexPage.vue'), beforeEnter: (to, from, next) => checkAuthentication(to, from, next, isLoggedIn) },
      { path: '/all', component: () => import('pages/IndexPage.vue'), beforeEnter: (to, from, next) => checkAuthentication(to, from, next, isLoggedIn) },
      { path: '/new', component: () => import('pages/NewTask.vue'), beforeEnter: (to, from, next) => checkAuthentication(to, from, next, isLoggedIn) },
      { path: '/edit/:id', component: () => import('pages/EditTask.vue'), props: { default: true }, beforeEnter: (to, from, next) => checkAuthentication(to, from, next, isLoggedIn) },
      { path: '/authentication', component: () => import('pages/Authentication.vue'), props: { default: true }, beforeEnter: (to, from, next) => checkAuthentication(to, from, next, isLoggedIn) },
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

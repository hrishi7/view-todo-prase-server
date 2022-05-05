/* eslint-disable @typescript-eslint/no-unused-vars */
import { RouteRecordRaw } from 'vue-router';

const components = {
  //layouts
  AuthLayout: () => import('layouts/AuthLayout.vue'),
  MainLayout: () => import('layouts/MainLayout.vue'),

  //pages
  Login: () => import('pages/SignIn.vue'),
  SignUp: () => import('pages/SignUp.vue'),
  Tasks: () => import('pages/TasksList.vue'),
  TaskDetails: () => import('components/Task/TaskDetails.vue'),

  //global status pages
  Loading: () => import('pages/Loading.vue'),
  NotFound: () => import('pages/NotFound.vue')
}
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: components.Loading,
  },
  {
    path: '/login',
    component: components.AuthLayout,
    children: [
      { path: '', component: components.Login, meta: { displayName: 'Login' } },
    ],
  },
  {
    path: '/sign-up',
    component: components.AuthLayout,
    children: [
      { path: '', component: components.SignUp, meta: { displayName: 'Sign Up' } }
    ]
  },
  {
    path: '/',
    component: components.MainLayout,
    children: [
      {
        path: 'tasks',
        component: components.Tasks,
        meta: {
          displayName: 'Tasks'
        },
        children: [
          {
            path: ':taskid',
            name: 'taskDetails',
            component: components.TaskDetails,
            props: true
          }
        ]
      }

    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: components.NotFound,
  },
];

export default routes;

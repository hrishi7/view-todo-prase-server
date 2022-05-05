import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import Parse from 'parse/dist/parse.min';
import routes from './routes';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory);

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  // Router.beforeEach((to, from) => {
  //   /**
  //    * Routes that don't require authentication
  //    */
  //   if (/^\/login|\/sign-up/g.test(to.path)) return true;

  //   /**
  //    * Routes that require authentication
  //    */
  //   //auth guard
  //   const localUser = Parse.User.current();
  //   if (!localUser) {
  //     if (/^\/sign-up/g.test(to.query.next as string)) return { path: to.query.next };

  //     return {
  //       path: '/login',
  //       query: to.path === '/' ? (!(to.query.next as string)?.startsWith('/login') ? to.query : {}) : { next: to.fullPath }
  //     }
  //   }
  //   return true;
  // })
  return Router;
});

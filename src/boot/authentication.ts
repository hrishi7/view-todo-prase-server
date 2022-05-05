import { boot } from 'quasar/wrappers'
import { isLoggedIn } from 'src/services/auth';

export default boot(({ router, store, redirect, urlPath }) => {
  console.log(router, store, redirect, urlPath)
  return new Promise((resolve, reject) => {
    const isAuthorized = isLoggedIn();// ...
    router.beforeEach((to, from, next) => {
      if (!isAuthorized && !urlPath.startsWith('/authentication')) {
        // the "url" param here is of the same type
        // as for "redirect" above
        redirect({ path: '/authentication' })
        return
      }
    })
  })
})
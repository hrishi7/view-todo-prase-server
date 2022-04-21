import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';

export const checkAuthentication = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext, isLoggedIn: () => boolean) => {
    if (to.fullPath === '/' || to.fullPath === '/all' || to.fullPath == '/new' || to.fullPath == '/edit') {
        if (!isLoggedIn()) {
            next('/authentication');
        }
    }
    if (to.fullPath === '/authentication') {
        if (isLoggedIn()) {
            next('/all');
        }
    }
    next();
}
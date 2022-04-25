import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import {isLoggedIn} from 'src/services/auth'

export function checkAuthentication(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
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